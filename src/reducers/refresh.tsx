import { useEffect, useCallback } from 'react'

import { config } from 'config.client'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { fetcher } from 'lib/fetcher'
import { useStore, State } from 'lib/store'
import { logger } from 'lib/logger'

import { useResponsive } from './responsive'

const isProduction = config.environment !== 'development'

export const useRefresh = () => {
	const { state, dispatch } = useStore()
	const { updateResponsive } = useResponsive()
	const dispatchToGlobalState = useCallback((user: Partial<State['user']>) => dispatch({ user: { ...state.user, ...user } }), [dispatch, state.user.accessToken])

	const refresh = useCallback(async () => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/auth/refresh', { cacheControl: 'no-cache' })
			const user = decodeJwtToken(accessToken)
			dispatchToGlobalState({ accessToken, email: user.sub, displayName: user.displayName, role: user.role, shouldRefresh: true, isStateKnown: true })
		} catch (error) {
			logger.error(error)
		}
	}, [dispatchToGlobalState])

	useEffect(() => {
		let refreshInterval = null as NodeJS.Timeout

		// Attempt to create a cookie with exactly the same name as the one meant to refresh, which is a http cookie
		// If the cookie can be read afterwards, there is no refresh cookie, otherwise, refresh with the http cookie
		const date = new Date()
		date.setTime(date.getTime() + 1000)
		const expires = `expires=${date.toUTCString()}`

		document.cookie = `${isProduction ? '__Host-refreshToken' : 'refreshToken'}=;path=/;${expires};${isProduction ? 'secure' : ''}`
		const hasRefreshToken = document.cookie.indexOf(isProduction ? '__Host-refreshToken' : 'refreshToken') === -1

		if (!hasRefreshToken && !state.user.accessToken) {
			dispatchToGlobalState({ isStateKnown: true })
		}

		// Initial load
		if (hasRefreshToken && !state.user.accessToken) {
			refresh()
		}

		if (state.user.accessToken) {
			updateResponsive({ showLogin: false })
		}

		// Start up an interval for getting a new access token if a refresh token is present
		if (state.user.accessToken && state.user.shouldRefresh) {
			refreshInterval = setInterval(async () => {
				if (state.user.accessToken && state.user.shouldRefresh) {
					const { exp } = decodeJwtToken(state.user.accessToken)
					if (Math.round(exp - (60 * 2)) <= Math.round(Date.now() / 1000)) await refresh()
				}
			}, 30000)
		}

		// Clear the interval when this hook is dismounted
		return () => clearInterval(refreshInterval)
	}, [state.user.accessToken, state.user.shouldRefresh, refresh])

	return { user: state.user, refresh }
}
