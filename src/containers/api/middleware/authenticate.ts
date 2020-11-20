import { setUser } from '@sentry/node'
import type { Span, Transaction } from '@sentry/types'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

import type { Token } from 'types/Token'
import { TokenTypes } from 'types/Token'

import { decrypt } from 'lib/cipher'

import { sendError, throwError } from '../errors/ApiError'
import { monitorReturn } from '../performanceCheck'

export type Options = {
	/** Does not error out if authentication fails, but still decodes the token if valid. Only valid for access token. */
	optional?: boolean,
	/** A token is automatically supplied through the request, but can be supplied manually here. */
	token?: string,
	/** Switch between authenticating an access, refresh or intermediate token. Defaults to access. */
	type?: TokenTypes,
	/** The Sentry transaction or span used for performance monitoring */
	transaction: Transaction | Span,
}

const resolveError = (error: unknown, res: NextApiResponse) => {
	sendError(401, res)
	throw error
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
export const authenticate = (req: NextApiRequest, res: NextApiResponse,
	{ optional = false, token, type = TokenTypes.Access, transaction }: Options) => monitorReturn(() => {
	const { headers: { authorization }, cookies } = req

	const getToken = () => {
		if (token) return token
		if (type === TokenTypes.Refresh) {
			return config.environment !== 'development'
				? cookies['__Host-refreshToken']
				: cookies['refreshToken']
		}
		if (authorization) return authorization?.split('Bearer ')[1]
		throw new Error('No token was specified or found in the request')
	}

	if (!getToken() && !optional) throwError(401, res)

	try {
		const { header, payload } = <{ header: { typ: TokenTypes }, payload: Omit<Token, 'typ'> }>jwt.verify(
			getToken(),
			config.auth.publicKey,
			{
				algorithms: ['RS256'],
				audience: ['https://bruhno.com', 'https://bruhno.dev'],
				issuer: 'https://bruhno.dev',
				complete: true,
			},
		)

		const decodedToken: Token = {
			...payload,
			typ: header.typ,
		}

		if (header.typ !== type && !optional) resolveError(new Error('Invalid type for JWT'), res)

		setUser({ id: decodedToken.userId, username: decodedToken.displayName, email: decodedToken.sub })
		return { ...decodedToken, secret: decrypt(decodedToken.secret) }
	} catch (error: unknown) {
		if (!optional) resolveError(error, res)
	}
}, `authenticate() - ${type}`, transaction)

/**
 * Authenticator for the system token. This is a simple check to see if the known value matches the supplied value.
 * @param req - The request object
 * @param res - The response object
 * @example
 * ```tsx
 * authenticateSystem(req, res)
 * ```
 */
export const authenticateSystem = (req: NextApiRequest, res: NextApiResponse) => {
	const { headers: { authorization } } = req
	if (authorization === `Bearer ${config.auth.systemToken}`) {
		setUser({ username: 'System' })
		return true
	} else throwError(401, res)
}
