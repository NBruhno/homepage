import { useState } from 'react'

import { useGlobalState } from 'states/global'
import { useModal } from 'states/modal'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { fetcher, Method } from 'lib/fetcher'
import { logger } from 'lib/logger'

import type { ChangePasswordModel } from 'components/Forms/ChangePassword'

export type User = {
	accessToken?: string | undefined,
	username: string | null,
	email: string | null,
	intermediateToken?: string | undefined,
	isStateKnown: boolean,
	role?: string | undefined,
	secret?: string,
	shouldRefresh: boolean,
	twoFactorSecret?: string,
	userId: string | null,
}

export const useAuth = () => {
	const [user, setUser] = useGlobalState('user')
	const [currentFlow, setCurrentFlow] = useState<'2fa' | 'loggedIn' | 'login' | 'register'>('login')
	const { closeModal } = useModal()

	const register = async ({ email, password, username, accessCode }: { email: string, password: string, username: string, accessCode: string }) => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/users', { method: Method.Post, body: { email, password, username, accessCode }, cacheControl: 'no-cache' })
			const decodedToken = decodeJwtToken(accessToken)
			setUser({ ...user, accessToken, email: decodedToken.sub, username: decodedToken.username, role: decodedToken.role, shouldRefresh: true, isStateKnown: true })
		} catch (error) {
			logger.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const { accessToken, intermediateToken } = await fetcher<{ accessToken?: string, intermediateToken?: string }>('/users/login', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })

			if (accessToken) {
				const { sub, username, role, userId } = decodeJwtToken(accessToken)
				setUser({ ...user, accessToken, email: sub, username, role, userId, shouldRefresh: true })
				setCurrentFlow('loggedIn')
				closeModal()
				return
			}

			if (intermediateToken) {
				const { userId } = decodeJwtToken(intermediateToken)
				setUser({ ...user, intermediateToken, userId })
				setCurrentFlow('2fa')
				return
			}

			logger.error('Login failed: Unknown payload')
		} catch (error) {
			logger.error(error)
		}
	}

	const logout = async () => {
		try {
			if (user.userId) {
				await fetcher(`/users/${user.userId}/logout`, { method: Method.Post, accessToken: user.accessToken, cacheControl: 'no-cache' })
				setUser({ ...user, accessToken: undefined, role: undefined, shouldRefresh: false })
				setCurrentFlow('login')
			}
		} catch (error) {
			logger.error(error)
		}
	}

	const changePassword = async ({ newPassword, currentPassword }: ChangePasswordModel) => {
		try {
			if (user.userId) {
				await fetcher(`/users/${user.userId}/changePassword`, {
					body: { newPassword, currentPassword },
					method: Method.Post,
					cacheControl: 'no-cache',
					accessToken: user.accessToken,
				})
			}
		} catch (error) {
			logger.error(error)
		}
	}

	const initialize2fa = async () => {
		try {
			if (user.userId) {
				const secret = await fetcher<string>(`/users/${user.userId}/2fa`, { accessToken: user.accessToken, cacheControl: 'no-cache' })
				setUser({ ...user, twoFactorSecret: secret })
			}
		} catch (error) {
			logger.error(error)
		}
	}

	const register2fa = async ({ otp }: { otp: string }) => {
		try {
			if (user.userId) {
				await fetcher(`/users/${user.userId}/2fa`, {
					body: { secret: user.secret, otp },
					method: Method.Patch,
					accessToken: user.accessToken,
					cacheControl: 'no-cache',
				})
			}
		} catch (error) {
			logger.error(error)
		}
	}

	const verify2fa = async ({ otp }: { otp: string }) => {
		try {
			if (user.userId) {
				const { accessToken } = await fetcher<{ accessToken: string }>(`/users/${user.userId}/2fa`, {
					body: { otp },
					method: Method.Post,
					accessToken: user.intermediateToken,
					cacheControl: 'no-cache',
				})

				const { sub, username, role, userId } = decodeJwtToken(accessToken)
				setUser({ ...user, accessToken, email: sub, username, role, userId, shouldRefresh: true, intermediateToken: undefined })
				setCurrentFlow('loggedIn')
				closeModal()
			}
		} catch (error) {
			logger.error(error)
		}
	}

	return { user, register, login, logout, initialize2fa, register2fa, verify2fa, changePassword, currentFlow, setCurrentFlow }
}
