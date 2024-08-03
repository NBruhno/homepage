import type { Span } from '@sentry/types'
import type { NextApiRequest } from 'next'
import type { UserToken } from 'types'
import { TokenType, UserRole } from 'types'

import { verify, decodeHeader } from '@node-rs/jsonwebtoken'
import { setUser } from '@sentry/nextjs'

import { config } from 'config.server'

import { ApiError } from 'lib/errors'
import { monitor } from 'lib/sentryMonitor'

export type Options = {
	/** A token is automatically inferred through the request, but can be supplied manually here. */
	token?: string,
	/** Switch between authenticating an access, refresh or intermediate token. Defaults to access. */
	type?: TokenType,
	/** The Sentry transaction or span used for performance monitoring. */
	transaction?: Span,
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
export const authenticate = async (req: NextApiRequest,
	{ token, type = TokenType.Access, transaction, allowedRoles = [] }: Options = {}) => monitor(async () => {
	const { headers: { authorization }, cookies } = req

	const tokenToUse = ((): string => {
		if (token) return token
		if (type === TokenType.Refresh && (cookies['__Host-refreshToken'] ?? cookies['refreshToken'])) {
			return config.environment !== 'development'
				? cookies['__Host-refreshToken']!
				: cookies['refreshToken']!
		}
		if (authorization) return authorization.split('Bearer ')[1]
		throw ApiError.fromCodeWithCause(400, new Error('No JWT attached to the request'))
	})()

	const { keyId, algorithm } = decodeHeader(tokenToUse)

	const keyPair = config.auth.keyPairs.find(({ id }) => id === keyId)

	if (!keyPair) throw ApiError.fromCodeWithCause(400, new Error(`No key pair found for the supplied key ID ${keyId}`))
	if (keyPair.type !== type) throw ApiError.fromCodeWithCause(400, new Error(`Key type mismatch, expected ${keyPair.type} but received ${type}`))
	if (keyPair.algorithm !== algorithm) throw ApiError.fromCodeWithCause(400, new Error(`Algorithm mismatch, expected ${keyPair.algorithm} but received ${algorithm}`))

	let decodedToken: UserToken | null = null

	try {
		decodedToken = await verify(
			tokenToUse,
			keyPair.publicKey,
			{
				requiredSpecClaims: ['exp', 'nbf', 'aud', 'iss', 'sub'],
				algorithms: [keyPair.algorithm],
				aud: ['https://bruhno.com', 'https://bruhno.dev', 'https://bruhn.dev'],
				iss: ['https://bruhn.dev'],
				validateExp: true,
				validateNbf: true,
			},
		) as UserToken
	} catch (error) {
		throw ApiError.fromCode(400)
	}

	// Return a 400 if the user does not have the any of the known roles
	if (!Object.values(UserRole).includes(decodedToken.role)) {
		throw ApiError.fromCodeWithCause(400, new Error(`Invalid JWT role, expected one of [${Object.values(UserRole).join(', ')}] but received "${decodedToken.role}"`))
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
