import { createMocks } from 'node-mocks-http'
import { errors } from 'jose'

import { getJwtToken } from '../getJwtToken'

import { authenticate } from './authenticate'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: 'user' }

describe('/api/middleware/authenticate', () => {
	test('Authenticate › Valid token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		const token = authenticate(req, res)
		expect(token)
	})

	test('Authenticate › Manually supplied token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload })
		const { req, res } = createMocks()

		const token = authenticate(req, res, { token: accessToken })
		expect(token)
	})

	test('Authenticate › Expired token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, exp: Math.floor(Date.now() / 1000) - 60 })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTExpired)
	})

	test('Authenticate › Invalid issuer', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, iss: 'https://something.else' })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTClaimInvalid)
	})

	test('Authenticate › Invalid audience', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, aud: ['https://something.else'] })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTClaimInvalid)
	})

	test('Authenticate › Tampered token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload }).split('.')
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken.join('Y.')}`,
			},
		})

		expect(() => authenticate(req, res)).toThrow(errors.JWTMalformed)
	})

	test('Authenticate › Optional', async () => {
		const { req, res } = createMocks()

		const token = authenticate(req, res, { optional: true })
		expect(token).toBe(undefined)
	})
})
