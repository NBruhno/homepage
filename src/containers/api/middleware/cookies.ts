import type { Span, Transaction } from '@sentry/types'
import type { NextApiResponse } from 'next'

import { serialize } from 'cookie'

import { config } from 'config.server'

import { monitorReturn } from '../performanceCheck'

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
export const setRefreshCookie = (res: NextApiResponse, token: string, transaction: Transaction | Span) => monitorReturn(() => {
	const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3)

	const cookie = serialize(isProduction ? '__Host-refreshToken' : 'refreshToken', token, {
		expires: new Date(expiration * 1000),
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 3,
		path: '/',
		sameSite: 'strict',
		secure: isProduction,
	})
	res.setHeader('Set-Cookie', cookie)
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
export const removeRefreshCookie = (res: NextApiResponse, transaction: Transaction | Span) => monitorReturn(() => {
	const cookie = serialize(isProduction ? '__Host-refreshToken' : 'refreshToken', '', {
		httpOnly: true,
		maxAge: -1,
		path: '/',
		sameSite: 'strict',
		expires: new Date('1970'),
		secure: isProduction,
	})

	res.setHeader('Set-Cookie', cookie)
}, 'removeRefreshCookie()', transaction)
