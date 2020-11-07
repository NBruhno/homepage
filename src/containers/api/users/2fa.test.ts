import type { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'
import { authenticator } from 'otplib'

import {
	parseJson, parseHeaders, testingToken, testingCredentials, testingUserId, expectStatusCode, expectSpecificObject,
	accessTokenMatch, refreshTokenMatch, retryFunction, transaction,
} from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { twoFactorAuthentication } from './2fa'
import { login } from './login'

const userId = '273772907449025029'
const twoFactorSecret = 'NBYTGTYQOVQCWHDA'
let intermediateToken = null as string

describe('/api/users/{userId}/2fa', () => {
	beforeAll(async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'mail+test2fa@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res, { transaction })
		intermediateToken = parseJson(res).intermediateToken
	})

	/** ------- GET method ------- */
	test('GET › Get 2FA secret', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await twoFactorAuthentication(req, res, { userId: testingUserId, transaction })
		expectStatusCode(res, 200)
		expect(typeof parseJson(res).twoFactorSecret).toBe('string')
	})

	test('GET › Unauthorized', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
		})

		await expect(twoFactorAuthentication(req, res, { userId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- PATCH method ------- */
	test('PATCH › Activate 2FA', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
			body: {
				otp: authenticator.generate(twoFactorSecret),
				secret: twoFactorSecret,
			},
		})

		await retryFunction(twoFactorAuthentication, req, res, 3, { userId: testingUserId, transaction })
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: '2FA has been activated' })
	})

	test('PATCH › Invalid OTP', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
			body: {
				secret: twoFactorSecret,
				otp: authenticator.generate('NBTNGYOYGVQCWHDA'),
			},
		})

		await expect(twoFactorAuthentication(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('PATCH › Invalid body', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(twoFactorAuthentication(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: ApiError.fromCode(400).message })
	})

	test('PATCH › Unauthorized', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'PATCH',
			body: {
				otp: authenticator.generate(twoFactorSecret),
				secret: twoFactorSecret,
			},
		})

		await expect(twoFactorAuthentication(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- POST method ------- */
	test('POST › Verify 2FA', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			headers: {
				authorization: `Bearer ${intermediateToken}`,
			},
			body: {
				otp: authenticator.generate(twoFactorSecret),
			},
		})

		await retryFunction(twoFactorAuthentication, req, res, 3, { userId: testingUserId, transaction })
		expectStatusCode(res, 200)
		expect(parseJson(res).accessToken).toMatch(accessTokenMatch)
		expect(parseHeaders(res)['set-cookie']).toMatch(refreshTokenMatch)
	})

	test('POST › Invalid OTP', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			headers: {
				authorization: `Bearer ${intermediateToken}`,
			},
			body: {
				otp: authenticator.generate('NBTNGYOYGVQCWHDA'),
			},
		})

		await expect(twoFactorAuthentication(req, res, { userId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('POST › Invalid body', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			headers: {
				authorization: `Bearer ${intermediateToken}`,
			},
		})

		await expect(twoFactorAuthentication(req, res, { userId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: ApiError.fromCode(400).message })
	})

	test('POST › Unauthorized', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
		})

		await expect(twoFactorAuthentication(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- DELETE method ------- */
	test('DELETE › Remove 2FA', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await twoFactorAuthentication(req, res, { userId: testingUserId, transaction })
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: '2FA has been removed' })
	})

	test('DELETE › Unauthorized', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'DELETE',
		})

		await expect(twoFactorAuthentication(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	/** ------- others ------- */
	test('Invalid method', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'CONNECT',
		})

		await expect(twoFactorAuthentication(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
		expectSpecificObject(res, { error: ApiError.fromCode(405).message })
	})
})
