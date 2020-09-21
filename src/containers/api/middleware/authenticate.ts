import { Span, Transaction } from '@sentry/apm'
import { NextApiRequest, NextApiResponse } from 'next'
import { JWT, errors } from 'jose'

import { config } from 'config.server'

import { Token, TokenTypes } from 'types/Token'

import { decrypt } from 'lib/cipher'

import { ApiError } from '../errors/ApiError'
import { monitorReturn } from '../performanceCheck'

export type Options = {
	/** Does not error out if authentication fails, but still decodes the token if valid. Only valid for access token. */
	optional?: boolean,
	/** A token is automatically supplied through the request, but can be supplied manually here. */
	token?: string,
	/** Switch between authenticating an access, refresh or intermediate token. Defaults to access. */
	type?: TokenTypes,
	transaction: Transaction | Span,
}

const resolveError = (error: unknown, res: NextApiResponse) => {
	if (error instanceof errors.JOSEError) {
		const apiError = ApiError.fromCode(401)
		res.status(apiError.statusCode).json({ error: apiError.message })
	}
	throw error
}

export const authenticate = (req: NextApiRequest, res: NextApiResponse,
	{ optional = false, token, type = TokenTypes.Access, transaction }: Options): Token => monitorReturn(() => {
	const { headers: { authorization }, cookies } = req

	const getToken = () => {
		if (token) return token
		if (type === TokenTypes.Refresh) return config.environment !== 'development' ? cookies['__Host-refreshToken'] : cookies['refreshToken']
		return authorization?.split('Bearer ')[1]
	}

	if (!getToken() && !optional) {
		const error = ApiError.fromCode(401)
		res.status(error.statusCode).json({ error: error.message })
		throw error
	}

	try {
		const decodedToken = <Token>JWT.verify(getToken(), config.auth.publicKey, {
			algorithms: ['RS256'],
			audience: ['https://bruhno.com', 'https://bruhno.dev'],
			issuer: 'https://bruhno.dev',
			typ: type,
		})

		return { ...decodedToken, secret: decrypt(decodedToken.secret) }
	} catch (error: unknown) {
		if (!optional) {
			resolveError(error, res)
		}
	}
}, `authenticate() - ${type}`, transaction)
