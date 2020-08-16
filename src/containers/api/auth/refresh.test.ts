import { createMocks } from 'node-mocks-http'

import { parseJson, parseHeaders, expectStatusCode, accessTokenMatch, refreshTokenMatch, testingCredentials } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { refresh } from './refresh'
import { login } from './login'

let refreshToken = null as string

describe('/api/auth/refresh', () => {
	beforeAll(async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res)
		refreshToken = parseHeaders(res)['set-cookie']
	})

	test('GET › Refresh token', async () => {
		const { req, res } = createMocks({
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

	test('GET › Invalid body', async () => {
		const { req, res } = createMocks({
			method: 'GET',
		})

		await expect(refresh(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(refresh(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
