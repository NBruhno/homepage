import { UserRole } from 'types'

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { ApiError } from 'api/errors'
import { getJwtToken } from 'api/utils'

import { createHttpMock } from '../tests/utils'

import { authenticate } from './authenticate'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: UserRole.User }

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

	test('Authenticate › Valid role', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, role: UserRole.Admin })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		const token = authenticate(req, { allowedRoles: [UserRole.Admin] })
		expect(token)
	})

	test('Authenticate › Invalid role', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, role: UserRole.Admin })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		expect(() => authenticate(req, { allowedRoles: [UserRole.User] })).toThrow(ApiError)
	})

	test('Authenticate › Unknown role', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, role: 'Something unknown' })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		expect(() => authenticate(req)).toThrow(ApiError)
	})

	test('Authenticate › No role (don\'t expect)', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, role: undefined })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		expect(() => authenticate(req)).toThrow(ApiError)
	})

	test('Authenticate › No role (do expect)', async () => {
		const accessToken = getJwtToken({ ...defaultPayload, role: undefined })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		expect(() => authenticate(req, { allowedRoles: [UserRole.User] })).toThrow(ApiError)
	})
})
