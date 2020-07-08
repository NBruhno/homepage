import { useEffect, useState, useCallback } from 'react'

import { config } from 'config.client'
import { decodeToken } from 'lib/decodeToken'
import { fetcher } from 'lib/fetcher'
import { useStore } from 'lib/store'

export const useRefresh = () => {
	const { state, dispatch } = useStore()
	const [hasRefreshToken, setHasRefreshToken] = useState(false)
	const isProduction = config.environment !== 'development'

	const dispatchToGlobalState = useCallback((user) => dispatch({ user }), [dispatch])

	const refresh = useCallback(async () => {
		try {
			const token = await fetcher('/auth/refresh')
			const user = decodeToken(token)
			dispatchToGlobalState({ accessToken: token, id: user.sub, email: user.email })
		} catch (error) {
			console.error(error)
		}
	}, [dispatchToGlobalState])

	useEffect(() => {
		// Attempt to create a cookie with exactly the same name as the one meant to refresh
		// If the cookie can be read afterwards, there is not refresh cookie, otherwise, refresh
		const date = new Date()
		date.setTime(date.getTime() + 1000)

		document.cookie = `${isProduction ? '__Host-refreshToken' : 'refreshToken'}=new_value;path=/;expires=${date.toUTCString()};${isProduction && 'secure;'}`
		setHasRefreshToken(document.cookie.indexOf(isProduction ? '__Host-refreshToken' : 'refreshToken') === -1)
	}, [state.user])

	useEffect(() => {
		let refreshInterval = null as NodeJS.Timeout

		// Initial load
		if (hasRefreshToken && !state.user.accessToken) {
			refresh()
		}

		// Start up an interval for getting a new access token if a refresh token is present
		if (state.user.accessToken && hasRefreshToken) {
			refreshInterval = setInterval(async () => {
				if (state.user.accessToken && hasRefreshToken) {
					const { exp } = decodeToken(state.user.accessToken)
					if (Math.round(exp - (60 * 2)) <= Math.round(Date.now() / 1000)) await refresh()
				}
			}, 30000)
		}

		// Clear the interval when this hook is dismounted
		return () => clearInterval(refreshInterval)
	}, [refresh, hasRefreshToken])

	return { user: state.user, refresh }
}
