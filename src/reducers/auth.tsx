import { useCallback, useState } from 'react'

import { decodeToken } from 'lib/decodeToken'
import { fetcher, Method } from 'lib/fetcher'
import { useStore } from 'lib/store'

export const useAuth = () => {
	const { state, dispatch } = useStore()
	const [userInfo, setUserInfo] = useState<{ exists: boolean, email: string } | null>(null)

	const dispatchToGlobalState = useCallback((user) => dispatch({ user }), [dispatch])

	const register = async ({ email, password }: { email: string, password: string }) => {
		try {
			const { accessToken } = await fetcher('/auth/register', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })
			const user = decodeToken(accessToken)
			dispatchToGlobalState({ accessToken, id: user.sub, email: user.email, shouldRefresh: true })
		} catch (error) {
			console.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const { accessToken, intermediateToken }: Record<string, string> = await fetcher('/auth/login', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })

			if (accessToken) {
				const user = decodeToken(accessToken)
				dispatchToGlobalState({ accessToken, id: user.sub, email: user.email, shouldRefresh: true })
				return
			}

			if (intermediateToken) {
				const user = decodeToken(intermediateToken)
				dispatchToGlobalState({ intermediateToken, id: user.sub, email: user.email, shouldRefresh: false })
				return
			}

			console.error('Login failed: Unknown payload')
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async () => {
		try {
			await fetcher('/auth/logout', { method: Method.Post, accessToken: state.user.accessToken, cacheControl: 'no-cache' })
			dispatchToGlobalState({ accessToken: null, id: null, email: null, shouldRefresh: false })
		} catch (error) {
			console.error(error)
		}
	}

	const check = async ({ email }: { email: string }) => {
		try {
			const { userExists } = await fetcher('/auth/check', { body: { email }, method: Method.Post, cacheControl: 'no-cache' })
			setUserInfo({ exists: userExists, email })
		} catch (error) {
			console.error(error)
		}
	}

	const initialize2fa = async () => {
		try {
			const secret = await fetcher('/auth/2fa', { accessToken: state.user.accessToken, cacheControl: 'no-cache' })
			dispatchToGlobalState({ twoFactorSecret: secret })
		} catch (error) {
			console.error(error)
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
			console.error(error)
		}
	}

	const verify2fa = async ({ otp }: { otp: string }) => {
		try {
			const { accessToken }: Record<string, string> = await fetcher('/auth/2fa', {
				body: { otp },
				method: Method.Post,
				accessToken: state.user.intermediateToken,
				cacheControl: 'no-cache',
			})

			const user = decodeToken(accessToken)
			dispatchToGlobalState({ accessToken, id: user.sub, email: user.email, shouldRefresh: true, intermediateToken: null })
		} catch (error) {
			console.error(error)
		}
	}

	return { user: state.user, userInfo, check, register, login, logout, initialize2fa, register2fa, verify2fa, setUserInfo }
}
