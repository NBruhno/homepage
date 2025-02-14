import { TokenType, UserRole } from 'types'

import { config } from 'config.server'

import { getJwtToken } from 'lib/api'
import { ApiError } from 'lib/errors'
import { createHttpMock } from 'lib/test'

import { authenticate } from './authenticate'

const defaultPayload = { sub: 'mail+test@bruhno.dev', displayName: 'Test', role: UserRole.User }
const getKeyPair = (tokenType: TokenType) => config.auth.keyPairs.find(({ type }) => type === tokenType)!

describe('/lib/middleware/authenticate', () => {
	test('Authenticate › Valid token', async () => {
		const accessToken = await getJwtToken({ ...defaultPayload }, { type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		const token = await authenticate(req)
		return expect(token)
	})

	test('Authenticate › Expired token', async () => {
		const accessToken = await getJwtToken(
			{ ...defaultPayload, exp: Math.floor(Date.now() / 1000) - 90 },
			{ type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id },
		)
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		return expect(authenticate(req)).rejects.toThrow(ApiError)
	})

	test('Authenticate › Invalid issuer', async () => {
		const accessToken = await getJwtToken(
			{ ...defaultPayload, iss: 'https://something.else' },
			{ type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id },
		)
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		return expect(authenticate(req)).rejects.toThrow(ApiError)
	})

	test('Authenticate › Invalid audience', async () => {
		const accessToken = await getJwtToken(
			{ ...defaultPayload, aud: ['https://something.else'] },
			{ type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id },
		)
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		return expect(authenticate(req)).rejects.toThrow(ApiError)
	})

	test('Authenticate › Tampered token', async () => {
		const accessToken = await getJwtToken({ ...defaultPayload }, { type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken.replace(/.$/, 'A')}`,
				},
			},
		})

		return expect(authenticate(req)).rejects.toThrow(ApiError)
	})

	test('Authenticate › Valid role', async () => {
		const accessToken = await getJwtToken({ ...defaultPayload, role: UserRole.Admin }, { type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id })
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
		const accessToken = await getJwtToken({ ...defaultPayload, role: UserRole.Admin }, { type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		return expect(authenticate(req, { allowedRoles: [UserRole.User] })).rejects.toThrow(ApiError)
	})

	test('Authenticate › Unknown role', async () => {
		const accessToken = await getJwtToken({ ...defaultPayload, role: 'Something unknown' }, { type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		return expect(authenticate(req)).rejects.toThrow(ApiError)
	})

	test("Authenticate › No role (don't expect)", async () => {
		const accessToken = await getJwtToken({ ...defaultPayload, role: undefined }, { type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		return expect(authenticate(req)).rejects.toThrow(ApiError)
	})

	test('Authenticate › No role (do expect)', async () => {
		const accessToken = await getJwtToken({ ...defaultPayload, role: undefined }, { type: TokenType.Access, keyId: getKeyPair(TokenType.Access).id })
		const { req } = createHttpMock({
			reqOptions: {
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			},
		})

		return expect(authenticate(req, { allowedRoles: [UserRole.User] })).rejects.toThrow(ApiError)
	})
})
