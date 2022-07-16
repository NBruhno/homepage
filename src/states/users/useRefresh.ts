import { useEffect, useCallback } from 'react'
import shallow from 'zustand/shallow'

import { config } from 'config.client'

import { usePage } from 'states/page'

import { getCookie } from 'lib/client'
import { decodeJwtToken } from 'lib/decodeJwtToken'
import { fetcher } from 'lib/fetcher'
import { logger } from 'lib/logger'

import { useUser } from './useUser'

const isProduction = config.environment !== 'development'

export const useRefresh = () => {
	const { setUser, setShouldRefresh, setIsStateKnown, accessToken, shouldRefresh } = useUser((state) => state, shallow)
	const setResponsive = usePage((state) => state.setResponsive)

	const onRefresh = useCallback(async () => {
		try {
			const { accessToken } = await fetcher<{ accessToken: string }>('/users/refresh', { cacheControl: 'no-cache' })
			const { sub, username, role, userId } = decodeJwtToken(accessToken)
			setUser({ accessToken, email: sub, username, role, userId })
			setShouldRefresh(true)
			setIsStateKnown(true)
		} catch (error) {
			logger.error(error)
		}
	}, [setUser, setShouldRefresh, setIsStateKnown])

	useEffect(() => {
		let refreshInterval = null as unknown as NodeJS.Timeout
		const hasRefreshToken = getCookie(isProduction ? '__Host-refreshTokenExists' : 'refreshTokenExists') === 'true'

		if (!hasRefreshToken && !accessToken) {
			setIsStateKnown(true)
		}

		// Initial load
		if (hasRefreshToken && !accessToken) {
			onRefresh()
		}

		if (accessToken) {
			setResponsive({ showLogin: false })
		}

		// Start up an interval for getting a new access token if a refresh token is present
		if (accessToken && shouldRefresh) {
			refreshInterval = setInterval(async () => {
				if (accessToken) {
					const { exp } = decodeJwtToken(accessToken)
					if (Math.round(exp - (60 * 2)) <= Math.round(Date.now() / 1000)) await onRefresh()
				}
			}, 30000)
		}

		// Clear the interval when this hook is dismounted
		return () => { clearInterval(refreshInterval) }
	}, [accessToken, shouldRefresh])
}
