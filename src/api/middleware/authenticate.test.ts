import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { getJwtToken } from 'api/utils'

import { createHttpMock } from '../tests/utils'

import { authenticate } from './authenticate'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: 'user' }

describe('/api/middleware/authenticate', () => {
	test('Authenticate › Valid token', async () => {
		const accessToken = getJwtToken({ ...defaultPayload })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		const token = authenticate(req)
		expect(token)
	})

	test('Authenticate › Manually supplied token', async () => {
		const accessToken = getJwtToken({ ...defaultPayload })
		const { req } = createHttpMock()

		const token = authenticate(req, { token: accessToken })
		expect(token)
	})

	test('Authenticate › Expired token', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, exp: Math.floor(Date.now() / 1000) - 60 })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		expect(() => authenticate(req)).toThrow(TokenExpiredError)
	})

	test('Authenticate › Invalid issuer', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, iss: 'https://something.else' })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		expect(() => authenticate(req)).toThrow(JsonWebTokenError)
	})

	test('Authenticate › Invalid audience', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, aud: ['https://something.else'] })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		expect(() => authenticate(req)).toThrow(JsonWebTokenError)
	})

	test('Authenticate › Tampered token', async () => {
		const accessToken = getJwtToken({ ...defaultPayload }).split('.')
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken.join('Y.')}`,
				},
			},
		})

		expect(() => authenticate(req)).toThrow(JsonWebTokenError)
	})
})
