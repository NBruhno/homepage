import { createMocks } from 'node-mocks-http'
import { errors } from 'jose'

import { generateAccessToken } from '../generateTokens'

import { authenticate } from './authenticate'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: 'user' }

describe('/api/middleware/authenticate', () => {
	test('Token › Valid', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		const token = authenticate(req, res)
		expect(token)
	})

	test('Token › Expired', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload, exp: Math.floor(Date.now() / 1000) - 60 })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTExpired)
	})

	test('Token › Invalid issuer', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload, iss: 'https://something.else' })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTClaimInvalid)
	})

	test('Token › Invalid audience', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload, aud: ['https://something.else'] })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTClaimInvalid)
	})

	test('Token › Tampered token', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload }).split('.')
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken.join('Y.')}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTMalformed)
	})

	test('Token › Optional', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		const token = authenticate(req, res, { optional: true })
		expect(token).toBe(undefined)
	})
})
