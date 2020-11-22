import { useEffect, useCallback } from 'react'

import { config } from 'config.client'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { fetcher } from 'lib/fetcher'
import { logger } from 'lib/logger'

import { useGlobalState } from './globalState'

const isProduction = config.environment !== 'development'

export const useRefresh = () => {
	const [user, setUser] = useGlobalState('user')
	const [responsive, setResponsive] = useGlobalState('responsive')

	const refresh = useCallback(async () => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/users/refresh', { cacheControl: 'no-cache' })
			const { sub, displayName, role, userId } = decodeJwtToken(accessToken)
			setUser({ ...user, accessToken, email: sub, displayName, role, userId, shouldRefresh: true, isStateKnown: true })
		} catch (error) {
			logger.error(error)
		}
	}, [user, setUser])

	useEffect(() => {
		let refreshInterval = null as unknown as NodeJS.Timeout

		// Attempt to create a cookie with exactly the same name as the one meant to refresh, which is a http cookie
		// If the cookie can be read afterwards, there is no refresh cookie, otherwise, refresh with the http cookie
		const date = new Date()
		date.setTime(date.getTime() + 1000)
		const expires = `expires=${date.toUTCString()}`

		document.cookie = `${isProduction ? '__Host-refreshToken' : 'refreshToken'}=;path=/;${expires};${isProduction ? 'secure' : ''}`
		const hasRefreshToken = document.cookie.indexOf(isProduction ? '__Host-refreshToken' : 'refreshToken') === -1

		if (!hasRefreshToken && !user.accessToken) {
			setUser({ ...user, isStateKnown: true })
		}

		// Initial load
		if (hasRefreshToken && !user.accessToken) {
			refresh()
		}

		if (user.accessToken) {
			setResponsive({ ...responsive, showLogin: false })
		}

		// Start up an interval for getting a new access token if a refresh token is present
		if (user.accessToken && user.shouldRefresh) {
			refreshInterval = setInterval(async () => {
				if (user.accessToken && user.shouldRefresh) {
					const { exp } = decodeJwtToken(user.accessToken)
					if (Math.round(exp - (60 * 2)) <= Math.round(Date.now() / 1000)) await refresh()
				}
			}, 30000)
		}

		// Clear the interval when this hook is dismounted
		return () => clearInterval(refreshInterval)
	}, [user.accessToken, user.shouldRefresh])

	return { user, refresh }
}
