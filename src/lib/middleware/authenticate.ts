import type { Span, Transaction } from '@sentry/types'
import type { NextApiRequest } from 'next'
import type { UserToken } from 'types'
import { UserTokenType, UserRole } from 'types'

import { setUser } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'

import { config } from 'config.server'

import { ApiError } from 'lib/errors'
import { monitor } from 'lib/sentryMonitor'

export type Options = {
	/** A token is automatically inferred through the request, but can be supplied manually here. */
	token?: string,
	/** Switch between authenticating an access, refresh or intermediate token. Defaults to access. */
	type?: UserTokenType,
	/** The Sentry transaction or span used for performance monitoring. */
	transaction?: Span | Transaction,
	/** Will return a `403` if the user does not have the roles from this list. */
	allowedRoles?: Array<UserRole>,
}

/**
 * An authenticator for JWT tokens created by getJwtToken(). It's possible to further configure the function by supplying
 * the available options as the third parameter. This function can check both access, refresh and intermediate tokens.
 * @param req - The request object
 * @param options - A set options for the authenticator. This is optional
 * @example
 * ```tsx
 * const token = authenticate(req, { transaction })
 * ```
 */
export const authenticate = (req: NextApiRequest,
	{ token, type = UserTokenType.Access, transaction, allowedRoles = [] }: Options = {}) => monitor(() => {
	const { headers: { authorization }, cookies } = req

	const tokenToUse = ((): string => {
		if (token) return token
		if (type === UserTokenType.Refresh && (cookies['__Host-refreshToken'] ?? cookies['refreshToken'])) {
			return config.environment !== 'development'
				? cookies['__Host-refreshToken']!
				: cookies['refreshToken']!
		}
		if (authorization) return authorization.split('Bearer ')[1]
		throw ApiError.fromCodeWithCause(401, new Error('No JWT attached to the request'))
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

	// Return a 403 if the type of the token is not the same as the one required
	if (header.typ !== type) throw ApiError.fromCodeWithCause(403, new Error(`Invalid JWT header, expected "${type}" but received "${header.typ}"`))

	const decodedToken: UserToken = {
		...payload,
		typ: header.typ,
	}

	// Return a 403 if the user does not have the any of the known roles
	if (!Object.values(UserRole).includes(decodedToken.role)) {
		throw ApiError.fromCodeWithCause(403, new Error(`Invalid JWT role, expected one of [${Object.values(UserRole).join(', ')}] but received "${decodedToken.role}"`))
	}

	// Return a 403 if the user does not have the any of required roles if specified
	if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
		throw ApiError.fromCodeWithCause(403, new Error(`Invalid JWT role, expected one of [${allowedRoles.join(', ')}] but received "${decodedToken.role}"`))
	}

	setUser({ id: decodedToken.userId, username: decodedToken.username, email: decodedToken.sub })
	return { ...decodedToken, token: tokenToUse }
}, 'authenticate()', type, transaction)

/**
 * Authenticator for the system token. This is a simple check to see if the known value matches the supplied value.
 * If valid it will return `true`, otherwise it will throw an `ApiError` `401`.
 * @example
 * ```ts
 * authenticateSystem(req)
 * ```
 */
export const authenticateSystem = (req: NextApiRequest) => {
	const { headers: { authorization } } = req
	if (authorization === `Bearer ${config.auth.systemToken}`) {
		setUser({ username: 'System' })
		return true
	} else throw ApiError.fromCodeWithCause(401, new Error(`Invalid system token`))
}
