import type { Transaction, Span } from '@sentry/types'
import { TokenTypes } from 'types/Token'

import jwt from 'jsonwebtoken'

import { config } from 'config.server'

import { encrypt } from 'lib/cipher'

import { monitorReturn } from './performanceCheck'

type Payload = Record<string, any>
type Options = {
	type?: TokenTypes,
	transaction: Transaction | Span,
}

const defaultPayload = {
	aud: ['https://bruhno.com', 'https://bruhno.dev'],
	iat: Math.floor(Date.now() / 1000) - 10,
	iss: 'https://bruhno.dev',
	nbf: Math.floor(Date.now() / 1000) - 30,
}

export const getJwtToken = (secret: string, payload: Payload, {
	type = TokenTypes.Access,
	transaction,
}: Options) => monitorReturn(() => {
	const getExpiration = () => {
		switch (type) {
			case TokenTypes.Access: return Math.floor(Date.now() / 1000) + (60 * 15) // 15 minutes
			case TokenTypes.Refresh: return Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3) // 3 days
			case TokenTypes.Intermediate: return Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutes
			default: throw new Error('Invalid type supplied')
		}
	}

	const signedJwt = jwt.sign({
		exp: getExpiration(),
		secret: secret ? encrypt(secret) : null,
		...defaultPayload,
		...payload,
	}, config.auth.privateKey, {
		algorithm: 'RS256',
		header: {
			typ: type,
		},
	})

	return signedJwt
}, `getJwtToken() - ${type}`, transaction)
