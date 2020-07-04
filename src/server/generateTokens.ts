import { JWT } from 'jose'

import { config } from 'config.server'
import { encrypt } from 'server/cipher'

type Payload = Record<string, any>

const defaultPayload = {
	aud: ['https://bruhno.com', 'https://bruhno.dev'],
	iat: Math.floor(Date.now() / 1000) - 10,
	iss: 'https://bruhno.dev',
	nbf: Math.floor(Date.now() / 1000) - 30,
}

export const generateAccessToken = (secret: string, payload: Payload) => {
	const signedToken = JWT.sign({
		...payload,
		...defaultPayload,
		// 15 minutes expiration
		exp: Math.floor(Date.now() / 1000) + (60 * 15),
		secret: secret ? encrypt(secret) : null,
	}, config.auth.privateKey, {
		algorithm: 'RS256',
	})

	return signedToken
}

export const generateRefreshToken = (secret: string, payload: Payload) => {
	const signedToken = JWT.sign({
		...payload,
		...defaultPayload,
		// 3 days expiration
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3),
		secret: secret ? encrypt(secret) : null,
	}, config.auth.refresh.privateKey, {
		algorithm: 'RS256',
	})

	return signedToken
}
