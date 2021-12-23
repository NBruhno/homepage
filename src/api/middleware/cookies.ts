import type { Span, Transaction } from '@sentry/types'
import type { NextApiResponse } from 'next'

import { serialize } from 'cookie'

import { config } from 'config.server'

import { monitor } from 'lib/sentryMonitor'

const isProduction = config.environment !== 'development'

/**
 * Function that applies a refresh token as a cookie to the request.
 * @param res - The response object
 * @param token - Refresh JWT token to set
 * @param transaction - The Sentry transaction or span used for performance monitoring
 * @example
 * ```tsx
 * setRefreshCookie(res, refreshToken, transaction)
 * ```
 */
export const setRefreshCookie = (res: NextApiResponse, token: string, transaction?: Span | Transaction) => monitor(() => {
	const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)

	const refreshCookie = serialize(isProduction ? '__Host-refreshToken' : 'refreshToken', token, {
		expires: new Date(expiration * 1000),
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 3,
		path: '/',
		sameSite: 'strict',
		secure: isProduction,
	})

	const refreshCookieCheck = serialize(isProduction ? '__Host-refreshTokenExists' : 'refreshTokenExists', 'true', {
		expires: new Date(expiration * 1000),
		httpOnly: false,
		maxAge: 60 * 60 * 24 * 3,
		path: '/',
		sameSite: 'strict',
		secure: isProduction,
	})

	res.setHeader('Set-Cookie', [refreshCookie, refreshCookieCheck])
}, 'setRefreshCookie()', transaction)

/**
 * Function that sets a cookie that removes the current refresh token.
 * @param res - The response object
 * @param transaction - The Sentry transaction or span used for performance monitoring
 * @example
 * ```tsx
 * removeRefreshCookie(res, transaction)
 * ```
 */
export const removeRefreshCookie = (res: NextApiResponse, transaction?: Span | Transaction) => monitor(() => {
	const refreshCookie = serialize(isProduction ? '__Host-refreshToken' : 'refreshToken', '', {
		httpOnly: true,
		maxAge: -1,
		path: '/',
		sameSite: 'strict',
		expires: new Date('1970'),
		secure: isProduction,
	})
	res.setHeader('Set-Cookie', refreshCookie)

	const refreshCookieCheck = serialize(isProduction ? '__Host-refreshTokenExists' : 'refreshTokenExists', '', {
		httpOnly: false,
		maxAge: -1,
		path: '/',
		sameSite: 'strict',
		expires: new Date('1970'),
		secure: isProduction,
	})
	res.setHeader('Set-Cookie', [refreshCookie, refreshCookieCheck])
}, 'removeRefreshCookie()', transaction)
