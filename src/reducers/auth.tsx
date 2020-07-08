import { useCallback } from 'react'

import { decodeToken } from 'lib/decodeToken'
import { fetcher, Method } from 'lib/fetcher'
import { useStore } from 'lib/store'

export const useAuth = () => {
	const { state, dispatch } = useStore()

	const dispatchToGlobalState = useCallback((user) => dispatch({ user }), [dispatch])

	const register = async ({ email, password }: { email: string, password: string }) => {
		try {
			const token = await fetcher('/auth/register', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email, shouldRefresh: true })
		} catch (error) {
			console.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const token = await fetcher('/auth/login', { method: Method.Post, body: { email, password }, cacheControl: 'no-cache' })
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email, shouldRefresh: true })
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

	return { user: state.user, register, login, logout }
}
