import type { NextApiRequest, NextApiResponse } from 'next'

import { createMocks } from 'node-mocks-http'

import {
	testingCredentials, parseJson, parseHeaders, expectStatusCode, expectSpecificObject, accessTokenMatch,
	intermediateTokenMatch, refreshTokenMatch, transaction,
} from 'test/utils'

import { ApiError } from 'api/errors'

import { login } from './login'

describe('/api/users/login', () => {
	test('POST › Successful login', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res, { transaction })
		expectStatusCode(res, 200)
		expect(parseJson(res).accessToken).toMatch(accessTokenMatch)
		expect(parseHeaders(res)['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(parseHeaders(res)['set-cookie']?.[1]).toMatch('true')
	})

	test('POST › Successful 2FA login', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'mail+test2fa@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res, { transaction })
		expectStatusCode(res, 200)
		expect(parseJson(res).intermediateToken).toMatch(intermediateTokenMatch)
	})

	test('POST › Invalid login', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'something',
				password: testingCredentials,
			},
		})

		await expect(login(req, res, { transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: 'Invalid email and/or password' })
	})

	test('POST › Invalid body', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
		})

		await expect(login(req, res, { transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: ApiError.fromCode(400).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
		})

		await expect(login(req, res, { transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
		expectSpecificObject(res, { error: ApiError.fromCode(405).message })
	})
})
