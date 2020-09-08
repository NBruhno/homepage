import { useState } from 'react'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { fetcher, Method } from 'lib/fetcher'
import { logger } from 'lib/logger'

import { useGlobalState } from './globalState'
import { useModal } from './modal'

export const useAuth = () => {
	const [user, setUser] = useGlobalState('user')
	const [currentFlow, setCurrentFlow] = useState<'login' | 'register' | 'loggedIn' | '2fa'>('login')
	const { closeModal } = useModal()

	const register = async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/users', { method: Method.Post, body: { email, password, displayName }, cacheControl: 'no-cache' })
			const decodedToken = decodeJwtToken(accessToken)
			setUser({ ...user, accessToken, email: decodedToken.sub, displayName: decodedToken.displayName, role: decodedToken.role, shouldRefresh: true, isStateKnown: true })
		} catch (error) {
			logger.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const { accessToken, intermediateToken } = await fetcher<{ accessToken?: string, intermediateToken?: string }>('/users/login', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })

			if (accessToken) {
				const { sub, displayName, role, userId } = decodeJwtToken(accessToken)
				setUser({ ...user, accessToken, email: sub, displayName, role, userId, shouldRefresh: true })
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
			await fetcher(`/users/${user.userId}/logout`, { method: Method.Post, accessToken: user.accessToken, cacheControl: 'no-cache' })
			setUser({ ...user, accessToken: null, email: null, displayName: null, role: null, userId: null, shouldRefresh: false })
			setCurrentFlow('login')
		} catch (error) {
			logger.error(error)
		}
	}

	const changePassword = async ({ newPassword }: { currentPassword: string, newPassword: string }) => {
		try {
			await fetcher(`/users/${user.userId}/changePassword`, { body: { newPassword }, method: Method.Post, cacheControl: 'no-cache', accessToken: user.accessToken })
		} catch (error) {
			logger.error(error)
		}
	}

	const initialize2fa = async () => {
		try {
			const secret = await fetcher<string>(`/users/${user.userId}/2fa`, { accessToken: user.accessToken, cacheControl: 'no-cache' })
			setUser({ ...user, twoFactorSecret: secret })
		} catch (error) {
			logger.error(error)
		}
	}

	const register2fa = async ({ otp }: { otp: string }) => {
		try {
			await fetcher(`/users/${user.userId}/2fa`, {
				body: { secret: user.secret, otp },
				method: Method.Patch,
				accessToken: user.accessToken,
				cacheControl: 'no-cache',
			})
		} catch (error) {
			logger.error(error)
		}
	}

	const verify2fa = async ({ otp }: { otp: string }) => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>(`/users/${user.userId}/2fa`, {
				body: { otp },
				method: Method.Post,
				accessToken: user.intermediateToken,
				cacheControl: 'no-cache',
			})

			const { sub, displayName, role, userId } = decodeJwtToken(accessToken)
			setUser({ ...user, accessToken, email: sub, displayName, role, userId, shouldRefresh: true, intermediateToken: null })
			setCurrentFlow('loggedIn')
			closeModal()
		} catch (error) {
			logger.error(error)
		}
	}

	return { user, register, login, logout, initialize2fa, register2fa, verify2fa, changePassword, currentFlow, setCurrentFlow }
}
