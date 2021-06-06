import { createMocks } from 'node-mocks-http'
import { expectSpecificObject, expectStatusCode, transaction } from 'test/utils'

import { ApiError } from 'api/errors'
import { getJwtToken } from 'api/utils'

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

		expect(() => authenticate(req, res, { transaction })).toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: 'jwt expired' })
	})

	test('Authenticate › Invalid issuer', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, iss: 'https://something.else' }, { transaction })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res, { transaction })).toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: 'jwt issuer invalid. expected: https://bruhno.dev' })
	})

	test('Authenticate › Invalid audience', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload, aud: ['https://something.else'] }, { transaction })
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		expect(() => authenticate(req, res, { transaction })).toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: 'jwt audience invalid. expected: https://bruhno.com or https://bruhno.dev' })
	})

	test('Authenticate › Tampered token', async () => {
		const accessToken = getJwtToken('secret', { ...defaultPayload }, { transaction }).split('.')
		const { req, res } = createMocks({
			headers: {
				authorization: `Bearer ${accessToken.join('Y.')}`,
			},
		})

		expect(() => authenticate(req, res, { transaction })).toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: 'invalid signature' })
	})
})
