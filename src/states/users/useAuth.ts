import { useState } from 'react'
import { shallow } from 'zustand/shallow'

import { useModal, useSnackbar } from 'states/page'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { ApiError } from 'lib/errors'
import { fetcher, Method } from 'lib/fetcher'
import { logger } from 'lib/logger'

import type { ChangePasswordModel } from 'components/Forms/ChangePassword'

import { useUser } from './useUser'

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
	const [currentFlow, setCurrentFlow] = useState<'2fa' | 'loggedIn' | 'login' | 'register'>('login')
	const addSnackbar = useSnackbar((state) => state.addSnackbar)
	const { onCloseModal } = useModal()
	const {
		setUser, setShouldRefresh, setIsStateKnown, setIntermediateToken, setTwoFactorSecret, resetUser,
		userId, accessToken, intermediateToken,
	} = useUser((state) => state, shallow)

	const createErrorSnackbar = (error: unknown) => {
		addSnackbar({ message: error instanceof ApiError ? error.message : 'Unknown error occurred', type: 'Alert' })
	}

	const onRegister = async ({ email, password, username, accessCode }: { email: string, password: string, username: string, accessCode: string }) => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/users', { method: Method.Post, body: { email, password, username, accessCode }, cacheControl: 'no-cache' })
			const decodedToken = decodeJwtToken(accessToken)
			setUser({ accessToken, email: decodedToken.sub, username: decodedToken.username, role: decodedToken.role, userId: null })
			setShouldRefresh(true)
			setIsStateKnown(true)
		} catch (error) {
			createErrorSnackbar(error)
			logger.error(error)
		}
	}

	const onLogin = async ({ email, password }: { email: string, password: string }) => {
		try {
			const { accessToken, intermediateToken } = await fetcher<{ accessToken?: string, intermediateToken?: string }>('/users/login', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })

			if (accessToken) {
				const { sub, username, role, userId } = decodeJwtToken(accessToken)
				setUser({ accessToken, email: sub, username, role, userId })
				setShouldRefresh(true)
				setCurrentFlow('loggedIn')
				onCloseModal()
				return
			}

			if (intermediateToken) {
				const { userId } = decodeJwtToken(intermediateToken)
				setIntermediateToken({ intermediateToken, userId })
				setCurrentFlow('2fa')
				return
			}

			logger.error('Login failed: Unknown payload')
		} catch (error) {
			createErrorSnackbar(error)
			logger.error(error)
		}
	}

	const onLogout = async () => {
		try {
			if (userId) {
				await fetcher(`/users/${userId}/logout`, { method: Method.Post, accessToken, cacheControl: 'no-cache' })
				resetUser()
				setCurrentFlow('login')
			}
		} catch (error) {
			createErrorSnackbar(error)
			logger.error(error)
		}
	}

	const onChangePassword = async ({ newPassword, currentPassword }: ChangePasswordModel) => {
		try {
			if (userId) {
				await fetcher(`/users/${userId}/changePassword`, {
					body: { newPassword, currentPassword },
					method: Method.Post,
					cacheControl: 'no-cache',
					accessToken,
				})
			}
		} catch (error) {
			createErrorSnackbar(error)
			logger.error(error)
		}
	}

	const onInitialize2fa = async () => {
		try {
			if (userId) {
				const secret = await fetcher<string>(`/users/${userId}/2fa`, { accessToken, cacheControl: 'no-cache' })
				setTwoFactorSecret(secret)
			}
		} catch (error) {
			createErrorSnackbar(error)
			logger.error(error)
		}
	}

	const onRegister2fa = async ({ otp, secret }: { otp: string, secret: string }) => {
		try {
			if (userId) {
				await fetcher(`/users/${userId}/2fa`, {
					body: { secret, otp },
					method: Method.Patch,
					accessToken,
					cacheControl: 'no-cache',
				})
			}
		} catch (error) {
			createErrorSnackbar(error)
			logger.error(error)
		}
	}

	const onVerify2fa = async ({ otp }: { otp: string }) => {
		try {
			if (userId) {
				const { accessToken } = await fetcher<{ accessToken: string }>(`/users/${userId}/2fa`, {
					body: { otp },
					method: Method.Post,
					accessToken: intermediateToken,
					cacheControl: 'no-cache',
				})

				const { sub, username, role } = decodeJwtToken(accessToken)
				resetUser()
				setUser({ accessToken, email: sub, username, role, userId })
				setShouldRefresh(true)
				setCurrentFlow('loggedIn')
				onCloseModal()
			}
		} catch (error) {
			createErrorSnackbar(error)
			logger.error(error)
		}
	}

	return { onRegister, onChangePassword, onInitialize2fa, onLogin, onLogout, onRegister2fa, onVerify2fa, currentFlow, setCurrentFlow }
}
