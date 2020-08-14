import { createMocks } from 'node-mocks-http'
import { errors } from 'jose'

import { generateAccessToken } from '../generateTokens'

import { authenticateAccessToken } from './authenticate'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: 'user' }

describe('/api/middleware/authenticate', () => {
	test('Access token › Valid', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		const token = authenticateAccessToken(req, res)
		expect(token)
	})

	test('Access token › Expired', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload, exp: Math.floor(Date.now() / 1000) - 60 })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticateAccessToken(req, res)).toThrow(errors.JWTExpired)
	})

	test('Access token › Invalid issuer', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload, iss: 'https://something.else' })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticateAccessToken(req, res)).toThrow(errors.JWTClaimInvalid)
	})

	test('Access token › Invalid audience', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload, aud: ['https://something.else'] })
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticateAccessToken(req, res)).toThrow(errors.JWTClaimInvalid)
	})

	test('Access token › Tampered token', async () => {
		const accessToken = generateAccessToken('secret', { ...defaultPayload }).split('.')
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken.join('Y.')}`,
			},
		})

		expect(() => authenticateAccessToken(req, res)).toThrow(errors.JWTMalformed)
	})

	// test('ERRORS › Invalid method', async () => {
	// 	const { req, res } = createMocks({
	// 		method: 'GET',
	// 		body: {
	// 			newPassword: randomBytes(20).toString('hex'),
	// 		},
	// 		headers: {
	// 			authorization: `Bearer ${testingToken}`,
	// 		},
	// 	})

	// 	await expect(changePassword(req, res)).rejects.toThrow(ApiError)
	// 	expectStatusCode(res, 405)
	// })
})
