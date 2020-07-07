import { useCallback } from 'react'

import { decodeToken } from 'lib/decodeToken'
import { fetcher, Method } from 'lib/fetcher'
import { useStore } from 'lib/store'

export const useAuth = () => {
	const { state, dispatch } = useStore()

	const dispatchToGlobalState = useCallback((user) => dispatch({ user }), [dispatch])

	const register = async ({ email, password }: { email: string, password: string }) => {
		try {
			const token = await fetcher('/auth/register', { method: Method.Post, body: { email, password } })
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email })
		} catch (error) {
			console.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const token = await fetcher('/auth/login', { method: Method.Post, body: { email, password } })
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email })
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async () => {
		try {
			await fetcher('/auth/logout', { method: Method.Post, accessToken: state.user.accessToken })
			dispatchToGlobalState({ accessToken: null, id: null, email: null })
		} catch (error) {
			console.error(error)
		}
	}

	return { user: state.user, register, login, logout }
}
