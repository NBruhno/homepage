import { createMocks } from 'node-mocks-http'
import { errors } from 'jose'

import { transaction } from 'test/utils'

import { getJwtToken } from '../getJwtToken'

import { authenticate } from './authenticate'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: 'user' }

describe('/api/middleware/authenticate', () => {
	test('Authenticate › Valid token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload }, { transaction })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		const token = authenticate(req, res, { transaction })
		expect(token)
	})

	test('Authenticate › Manually supplied token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload }, { transaction })
		const { req, res } = createMocks()

		const token = authenticate(req, res, { token: accessToken, transaction })
		expect(token)
	})

	test('Authenticate › Expired token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, exp: Math.floor(Date.now() / 1000) - 60 }, { transaction })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res, { transaction })).toThrow(errors.JWTExpired)
	})

	test('Authenticate › Invalid issuer', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, iss: 'https://something.else' }, { transaction })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res, { transaction })).toThrow(errors.JWTClaimInvalid)
	})

	test('Authenticate › Invalid audience', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, aud: ['https://something.else'] }, { transaction })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res, { transaction })).toThrow(errors.JWTClaimInvalid)
	})

	test('Authenticate › Tampered token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload }, { transaction }).split('.')
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken.join('Y.')}`,
			},
		})

		expect(() => authenticate(req, res, { transaction })).toThrow(errors.JWTMalformed)
	})

	test('Authenticate › Optional', async () => {
		const { req, res } = createMocks()

		const token = authenticate(req, res, { optional: true, transaction })
		expect(token).toBe(undefined)
	})
})
