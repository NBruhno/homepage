import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'

import { parseJson, parseHeaders, expectStatusCode, accessTokenMatch, refreshTokenMatch, testingCredentials, expectSpecificObject } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { refresh } from './refresh'
import { login } from './login'

let refreshToken = null as string

describe('/api/users/refresh', () => {
	beforeAll(async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res)
		// @ts-expect-error it does not return a string[] in this case
		refreshToken = parseHeaders(res)['set-cookie']
	})

	test('GET › Refresh token', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			cookies: {
				refreshToken: refreshToken.split('refreshToken=')[1].split(';')[0],
			},
		})

		await refresh(req, res)
		expectStatusCode(res, 200)
		expect(parseJson(res).accessToken).toMatch(accessTokenMatch)
		expect(parseHeaders(res)['set-cookie']).toMatch(refreshTokenMatch)
	})

	test('GET › Unauthorized', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
		})

		await expect(refresh(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
		})

		await expect(refresh(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
