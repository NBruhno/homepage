import { createMocks } from 'node-mocks-http'
import { authenticator } from 'otplib'

import { parseJson, parseHeaders, testingToken, testingCredentials, expectStatusCode, expectSpecificObject, accessTokenMatch, refreshTokenMatch, retryFunction } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { twoFactorAuthentication } from './2fa'
import { login } from './login'

const twoFactorSecret = 'NBYTGTYQOVQCWHDA'
let intermediateToken = null as string

describe('/api/auth/2fa', () => {
	beforeAll(async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test2fa@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res)
		intermediateToken = parseJson(res).intermediateToken
	})

	/** ------- GET method ------- */
	test('GET    › Get 2FA secret', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await twoFactorAuthentication(req, res)
		expectStatusCode(res, 200)
		expect(typeof parseJson(res).twoFactorSecret).toBe('string')
	})

	test('GET    › Unauthorized', async () => {
		const { req, res } = createMocks({
			method: 'GET',
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- PATCH method ------- */
	test('PATCH  › Activate 2FA', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
			body: {
				otp: authenticator.generate(twoFactorSecret),
				secret: twoFactorSecret,
			},
		})

		await retryFunction(twoFactorAuthentication, req, res, 3)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: '2FA has been activated' })
	})

	test('PATCH  › Invalid OTP', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
			body: {
				secret: twoFactorSecret,
				otp: authenticator.generate('NBTNGYOYGVQCWHDA'),
			},
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('PATCH  › Invalid body', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: ApiError.fromCode(400).message })
	})

	test('PATCH  › Unauthorized', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			body: {
				otp: authenticator.generate(twoFactorSecret),
				secret: twoFactorSecret,
			},
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- POST method ------- */
	test('POST   › Verify 2FA', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${intermediateToken}`,
			},
			body: {
				otp: authenticator.generate(twoFactorSecret),
			},
		})

		await retryFunction(twoFactorAuthentication, req, res, 3)
		expectStatusCode(res, 200)
		expect(parseJson(res).accessToken).toMatch(accessTokenMatch)
		expect(parseHeaders(res)['set-cookie']).toMatch(refreshTokenMatch)
	})

	test('POST   › Invalid OTP', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${intermediateToken}`,
			},
			body: {
				otp: authenticator.generate('NBTNGYOYGVQCWHDA'),
			},
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('POST   › Invalid body', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${intermediateToken}`,
			},
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: ApiError.fromCode(400).message })
	})

	test('POST   › Unauthorized', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- DELETE method ------- */
	test('DELETE › Remove 2FA', async () => {
		const { req, res } = createMocks({
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await twoFactorAuthentication(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: '2FA has been removed' })
	})

	test('DELETE › Unauthorized', async () => {
		const { req, res } = createMocks({
			method: 'DELETE',
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- others ------- */
	test('ERRORS › Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'CONNECT',
		})

		await expect(twoFactorAuthentication(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
		expectSpecificObject(res, { error: ApiError.fromCode(405).message })
	})
})
