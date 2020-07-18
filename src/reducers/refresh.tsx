import { useEffect, useCallback } from 'react'

import { config } from 'config.client'

import { decodeToken } from 'lib/decodeToken'
import { fetcher } from 'lib/fetcher'
import { useStore } from 'lib/store'

const isProduction = config.environment !== 'development'

export const useRefresh = () => {
	const { state, dispatch } = useStore()

	const dispatchToGlobalState = useCallback((user) => dispatch({ user }), [dispatch])

	const refresh = useCallback(async () => {
		try {
			const { accessToken } = await fetcher('/auth/refresh', { cacheControl: 'no-cache' })
			const user = decodeToken(accessToken)
			dispatchToGlobalState({ accessToken, email: user.sub, shouldRefresh: true })
		} catch (error) {
			console.error(error)
		}
	}, [dispatchToGlobalState])

	useEffect(() => {
		let refreshInterval = null as NodeJS.Timeout

		// Attempt to create a cookie with exactly the same name as the one meant to refresh
		// If the cookie can be read afterwards, there is not refresh cookie, otherwise, refresh
		const date = new Date()
		date.setTime(date.getTime() + 1000)
		const expires = `expires=${date.toUTCString()}`

		document.cookie = `${isProduction ? '__Host-refreshToken' : 'refreshToken'}=;path=/;${expires};${isProduction ? 'secure' : ''}`
		const hasRefreshToken = document.cookie.indexOf(isProduction ? '__Host-refreshToken' : 'refreshToken') === -1

		// Initial load
		if (hasRefreshToken && !state.user.accessToken) {
			refresh()
		}

		// Start up an interval for getting a new access token if a refresh token is present
		if (state.user.accessToken && state.user.shouldRefresh) {
			refreshInterval = setInterval(async () => {
				if (state.user.accessToken && state.user.shouldRefresh) {
					const { exp } = decodeToken(state.user.accessToken)
					if (Math.round(exp - (60 * 2)) <= Math.round(Date.now() / 1000)) await refresh()
				}
			}, 30000)
		}

		// Clear the interval when this hook is dismounted
		return () => clearInterval(refreshInterval)
	}, [state.user.accessToken, state.user.shouldRefresh, refresh])

	return { user: state.user, refresh }
}