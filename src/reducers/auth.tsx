import { useCallback, useState } from 'react'

import { decodeToken } from 'lib/decodeToken'
import { fetcher, Method } from 'lib/fetcher'
import { logger } from 'lib/logger'
import { useStore, State } from 'lib/store'

export const useAuth = () => {
	const { state, dispatch } = useStore()
	const [userInfo, setUserInfo] = useState<{ exists: boolean, email: string } | null>(null)
	const dispatchToGlobalState = useCallback((user: Partial<State['user']>) => dispatch({ user: { ...state.user, ...user } }), [dispatch, state.user])

	const register = async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/auth/register', { method: Method.Post, body: { email, password, displayName }, cacheControl: 'no-cache' })
			const user = decodeToken(accessToken)
			dispatchToGlobalState({ accessToken, email: user.sub, displayName: user.displayName, role: user.role, shouldRefresh: true, isStateKnown: true })
		} catch (error) {
			logger.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const { accessToken, intermediateToken }: Record<string, string> = await fetcher<{ accessToken: string, intermediateToken: string }>('/auth/login', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })

			if (accessToken) {
				const user = decodeToken(accessToken)
				setUserInfo(null)
				dispatchToGlobalState({ accessToken, email: user.sub, displayName: user.displayName, role: user.role, shouldRefresh: true })
				return
			}

			if (intermediateToken) {
				dispatchToGlobalState({ intermediateToken })
				return
			}

			logger.error('Login failed: Unknown payload')
		} catch (error) {
			logger.error(error)
		}
	}

	const logout = async () => {
		try {
			await fetcher('/auth/logout', { method: Method.Post, accessToken: state.user.accessToken, cacheControl: 'no-cache' })
			dispatchToGlobalState({ accessToken: null, email: null, displayName: null, role: null, shouldRefresh: false })
		} catch (error) {
			logger.error(error)
		}
	}

	const changePassword = async ({ newPassword }: { currentPassword: string, newPassword: string }) => {
		try {
			await fetcher('/auth/changePassword', { body: { newPassword }, method: Method.Post, cacheControl: 'no-cache', accessToken: state.user.accessToken })
		} catch (error) {
			logger.error(error)
		}
	}

	const check = async ({ email }: { email: string }) => {
		try {
			const { userExists } = await fetcher<{ userExists: boolean }>('/auth/check', { body: { email }, method: Method.Post, cacheControl: 'no-cache' })
			setUserInfo({ exists: userExists, email })
		} catch (error) {
			logger.error(error)
		}
	}

	const initialize2fa = async () => {
		try {
			const secret = await fetcher<string>('/auth/2fa', { accessToken: state.user.accessToken, cacheControl: 'no-cache' })
			dispatchToGlobalState({ twoFactorSecret: secret })
		} catch (error) {
			logger.error(error)
		}
	}

	const register2fa = async ({ otp }: { otp: string }) => {
		try {
			await fetcher('/auth/2fa', {
				body: { secret: state.user.secret, otp },
				method: Method.Patch,
				accessToken: state.user.accessToken,
				cacheControl: 'no-cache',
			})
		} catch (error) {
			logger.error(error)
		}
	}

	const verify2fa = async ({ otp }: { otp: string }) => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/auth/2fa', {
				body: { otp },
				method: Method.Post,
				accessToken: state.user.intermediateToken,
				cacheControl: 'no-cache',
			})

			const user = decodeToken(accessToken)
			setUserInfo(null)
			dispatchToGlobalState({ accessToken, email: user.sub, displayName: user.displayName, role: user.role, shouldRefresh: true, intermediateToken: null })
		} catch (error) {
			logger.error(error)
		}
	}

	return { user: state.user, userInfo, check, register, login, logout, initialize2fa, register2fa, verify2fa, setUserInfo, changePassword }
}
