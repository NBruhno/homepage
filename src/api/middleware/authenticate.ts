import type { Span, Transaction } from '@sentry/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Token } from 'types'
import { TokenType } from 'types'

import { setUser } from '@sentry/nextjs'
import jwt from 'jsonwebtoken'

import { config } from 'config.server'

import { decrypt } from 'lib/cipher'

import { createAndAttachError } from 'api/errors'
import { monitorReturn } from 'api/utils'

export type Options = {
	/** A token is automatically supplied through the request, but can be supplied manually here. */
	token?: string,
	/** Switch between authenticating an access, refresh or intermediate token. Defaults to access. */
	type?: TokenType,
	/** The Sentry transaction or span used for performance monitoring */
	transaction: Transaction | Span,
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
	{ token, type = TokenType.Access, transaction }: Options) => monitorReturn(() => {
	try {
		const { headers: { authorization }, cookies } = req

		const tokenToUse = (() => {
			if (token) return token
			if (type === TokenType.Refresh) {
				return config.environment !== 'development'
					? cookies['__Host-refreshToken']
					: cookies['refreshToken']
			}
			if (authorization) return authorization.split('Bearer ')[1]
			throw createAndAttachError(401, res)
		})()

		const { header, payload } = <{ header: { typ: TokenType }, payload: Omit<Token, 'typ'> }><unknown>jwt.verify(
			tokenToUse as string,
			config.auth.publicKey,
			{
				algorithms: ['RS256'],
				audience: ['https://bruhno.com', 'https://bruhno.dev'],
				issuer: 'https://bruhno.dev',
				complete: true,
			},
		)

		if (header.typ !== type) throw createAndAttachError(401, res)

		const decodedToken: Token = {
			...payload,
			typ: header.typ,
		}

		setUser({ id: decodedToken.userId, username: decodedToken.displayName, email: decodedToken.sub })
		return { ...decodedToken, secret: decrypt(decodedToken.secret) }
	} catch (error) {
		throw createAndAttachError(401, res, error)
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
	} else throw createAndAttachError(401, res)
}
