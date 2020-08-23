import { useState } from 'react'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { fetcher, Method } from 'lib/fetcher'
import { logger } from 'lib/logger'

import { useGlobalState } from './globalState'

export const useAuth = () => {
	const [user, setUser] = useGlobalState('user')
	const [userInfo, setUserInfo] = useState<{ exists: boolean, email: string } | null>(null)

	const register = async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/auth/register', { method: Method.Post, body: { email, password, displayName }, cacheControl: 'no-cache' })
			const decodedToken = decodeJwtToken(accessToken)
			setUser({ ...user, accessToken, email: decodedToken.sub, displayName: decodedToken.displayName, role: decodedToken.role, shouldRefresh: true, isStateKnown: true })
		} catch (error) {
			logger.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const { accessToken, intermediateToken }: Record<string, string> = await fetcher<{ accessToken: string, intermediateToken: string }>('/auth/login', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })

			if (accessToken) {
				const { sub, displayName, role } = decodeJwtToken(accessToken)
				setUserInfo(null)
				setUser({ ...user, accessToken, email: sub, displayName, role, shouldRefresh: true })
				return
			}

			if (intermediateToken) {
				setUser({ ...user, intermediateToken })
				return
			}

			logger.error('Login failed: Unknown payload')
		} catch (error) {
			logger.error(error)
		}
	}

	const logout = async () => {
		try {
			await fetcher('/auth/logout', { method: Method.Post, accessToken: user.accessToken, cacheControl: 'no-cache' })
			setUser({ ...user, accessToken: null, email: null, displayName: null, role: null, shouldRefresh: false })
		} catch (error) {
			logger.error(error)
		}
	}

	const changePassword = async ({ newPassword }: { currentPassword: string, newPassword: string }) => {
		try {
			await fetcher('/auth/changePassword', { body: { newPassword }, method: Method.Post, cacheControl: 'no-cache', accessToken: user.accessToken })
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
			const secret = await fetcher<string>('/auth/2fa', { accessToken: user.accessToken, cacheControl: 'no-cache' })
			setUser({ ...user, twoFactorSecret: secret })
		} catch (error) {
			logger.error(error)
		}
	}

	const register2fa = async ({ otp }: { otp: string }) => {
		try {
			await fetcher('/auth/2fa', {
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
			const { accessToken } = await fetcher<{ accessToken: string }>('/auth/2fa', {
				body: { otp },
				method: Method.Post,
				accessToken: user.intermediateToken,
				cacheControl: 'no-cache',
			})

			const { sub, displayName, role } = decodeJwtToken(accessToken)
			setUserInfo(null)
			setUser({ ...user, accessToken, email: sub, displayName, role, shouldRefresh: true, intermediateToken: null })
		} catch (error) {
			logger.error(error)
		}
	}

	return { user, userInfo, check, register, login, logout, initialize2fa, register2fa, verify2fa, setUserInfo, changePassword }
}
