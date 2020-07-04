import { useEffect, useCallback } from 'react'

import { useStore } from 'lib/store'
import { fetcher, Method } from 'lib/fetcher'
import { decodeToken } from 'lib/decodeToken'

export const useAuth = () => {
	const { state, dispatch } = useStore()

	const dispatchToGlobalState = useCallback((user) => dispatch({ user }), [dispatch])

	const signUp = async ({ email, password }: { email: string, password: string }) => {
		try {
			const token = await fetcher('/auth', { method: Method.Put, body: { email, password } })
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email })
		} catch (error) {
			console.error(error)
		}
	}

	const login = async ({ email, password }: { email: string, password: string }) => {
		try {
			const token = await fetcher('/auth', { method: Method.Post, body: { email, password } })
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email })
		} catch (error) {
			console.error(error)
		}
	}

	const logout = async () => {
		try {
			await fetcher('/auth', { method: Method.Delete, accessToken: state.user.accessToken })
			dispatchToGlobalState({ accessToken: null, id: null, email: null })
		} catch (error) {
			console.error(error)
		}
	}

	const refresh = async () => {
		try {
			const token = await fetcher('/auth')
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email })
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		let refreshInterval = null as NodeJS.Timeout
		if (!state.user.accessToken) {
			refresh()
		} else {
			refreshInterval = setInterval(async () => {
				if (state.user.accessToken) {
					const { exp } = decodeToken(state.user.accessToken)
					if (Math.round(exp - (60 * 2)) <= Math.round(Date.now() / 1000)) await refresh()
				}
			}, 30000)
		}

		return () => clearInterval(refreshInterval)
	}, [state.user.accessToken])

	return { user: state.user, signUp, login, logout, refresh }
}
