import type { Transaction, Span } from '@sentry/types'
import { UserTokenType } from 'types'

import jwt from 'jsonwebtoken'

import { config } from 'config.server'

import { monitor } from '../../lib/sentryMonitor'

type Payload = Record<string, any>
type Options = {
	type?: UserTokenType,
	transaction?: Span | Transaction,
}

const defaultPayload = {
	aud: ['https://bruhno.com', 'https://bruhno.dev'],
	iat: Math.floor(Date.now() / 1000) - 10,
	iss: 'https://bruhno.dev',
	nbf: Math.floor(Date.now() / 1000) - 30,
}

export const getJwtToken = (payload: Payload, { type = UserTokenType.Access, transaction }: Options = {}) => monitor(() => {
	const getExpiration = () => {
		switch (type) {
			case UserTokenType.Access: return Math.floor(Date.now() / 1000) + (60 * 15) // 15 minutes
			case UserTokenType.Refresh: return Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3) // 3 days
			case UserTokenType.Intermediate: return Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutes
			default: throw new Error('Invalid type supplied')
		}
	}

	const signedJwt = jwt.sign({
		exp: getExpiration(),
		...defaultPayload,
		...payload,
	}, config.auth.privateKey, {
		algorithm: 'RS256',
		header: {
			alg: 'RS256',
			typ: type,
		},
	})

	return signedJwt
}, 'getJwtToken()', type, transaction)
