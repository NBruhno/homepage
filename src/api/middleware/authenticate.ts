import type { Span, Transaction } from '@sentry/types'
import type { NextApiRequest } from 'next'
import type { UserToken } from 'types'
import { UserTokenType } from 'types'

import { setUser } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'

import { config } from 'config.server'

import { monitor } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'

export type Options = {
	/** A token is automatically supplied through the request, but can be supplied manually here. */
	token?: string,
	/** Switch between authenticating an access, refresh or intermediate token. Defaults to access. */
	type?: UserTokenType,
	/** The Sentry transaction or span used for performance monitoring */
	transaction?: Span | Transaction,
}

/**
 * An authenticator for JWT tokens created by getJwtToken(). It's possible to further configure the function by supplying
 * the available options as the third parameter. This function can check both access, refresh and intermediate tokens.
 * @param req - The request object
 * @param res - The response object
 * @param options - A set options for the authenticator. This is optional
 * @example
 * ```tsx
 * const token = authenticate(req, res, { transaction })
 * ```
 */
export const authenticate = (req: NextApiRequest,
	{ token, type = UserTokenType.Access, transaction }: Options = {}) => monitor(() => {
	const { headers: { authorization }, cookies } = req

	const tokenToUse = (() => {
		if (token) return token
		if (type === UserTokenType.Refresh && (cookies['__Host-refreshToken'] || cookies['refreshToken'])) {
			return config.environment !== 'development'
				? cookies['__Host-refreshToken']
				: cookies['refreshToken']
		}
		if (authorization) return authorization.split('Bearer ')[1]
		throw ApiError.fromCode(401)
	})()

	const { header, payload } = <{ header: { typ: UserTokenType }, payload: Omit<UserToken, 'typ'> }><unknown>jwt.verify(
		tokenToUse,
		config.auth.publicKey,
		{
			algorithms: ['RS256'],
			audience: ['https://bruhno.com', 'https://bruhno.dev'],
			issuer: 'https://bruhno.dev',
			complete: true,
			ignoreExpiration: false,
			ignoreNotBefore: false,
		},
	)

	if (header.typ !== type) throw ApiError.fromCode(401)

	const decodedToken: UserToken = {
		...payload,
		typ: header.typ,
	}

	setUser({ id: decodedToken.userId, username: decodedToken.username, email: decodedToken.sub })
	return decodedToken
}, 'authenticate()', type, transaction)

/**
 * Authenticator for the system token. This is a simple check to see if the known value matches the supplied value.
 * If valid it will return `true`, otherwise it will throw an `ApiError` `401`.
 * @example
 * ```ts
 * authenticateSystem(req, res)
 * ```
 */
export const authenticateSystem = (req: NextApiRequest) => {
	const { headers: { authorization } } = req
	if (authorization === `Bearer ${config.auth.systemToken}`) {
		setUser({ username: 'System' })
		return true
	} else throw ApiError.fromCode(401)
}
