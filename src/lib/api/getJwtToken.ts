import type { Span } from '@sentry/types'
import { TokenType } from 'types'

import { sign } from '@node-rs/jsonwebtoken'

import { config } from 'config.server'

import { monitor } from '../../lib/sentryMonitor'

type Payload = Record<string, any>
type Options = {
	keyId?: string,
	type: TokenType,
	transaction?: Span,
}

const defaultPayload = {
	aud: ['https://bruhno.com', 'https://bruhno.dev', 'https://bruhn.dev'],
	iat: Math.floor(Date.now() / 1000) - 10,
	iss: 'https://bruhn.dev',
	nbf: Math.floor(Date.now() / 1000) - 30,
}

const getTokenProperties = (tokenType: TokenType, keyId?: string) => {
	let keyPair = config.auth.keyPairs.find(({ id }) => id === keyId)
	if (!keyPair) keyPair = config.auth.keyPairs.find(({ type }) => type === tokenType)
	if (!keyPair) throw new Error('No key pair found for the supplied key ID or token type')

	switch (tokenType) {
		case TokenType.Access: return {
			...keyPair,
			expiration: Math.floor(Date.now() / 1000) + (60 * 15), // 15 minutes
		}
		case TokenType.Refresh: return {
			...keyPair,
			expiration: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), // 3 days
		}
		case TokenType.Intermediate: return {
			...keyPair,
			expiration: Math.floor(Date.now() / 1000) + (60 * 5), // 5 minutes
		}
		case TokenType.System: return {
			...keyPair,
			expiration: null,
		}
		default: throw new Error('Invalid type supplied')
	}
}

export const getJwtToken = async (payload: Payload, { keyId, type, transaction }: Options = { type: TokenType.Access }) => monitor(async () => {
	const { id, expiration, algorithm, privateKey } = getTokenProperties(type, keyId)

	const signedJwt = await sign({
		exp: expiration,
		...defaultPayload,
		...payload,
	}, privateKey, {
		keyId: id,
		algorithm,
	})

	return signedJwt
}, 'getJwtToken()', type, transaction)
