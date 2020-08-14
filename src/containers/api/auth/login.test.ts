import { createMocks } from 'node-mocks-http'

import { testingCredentials, parseJson, parseHeaders, expectStatusCode, expectSpecificObject, accessTokenMatch, intermediateTokenMatch, refreshTokenMatch } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { login } from './login'

describe('/api/auth/login', () => {
	test('POST › Successful login', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res)
		expectStatusCode(res, 200)
		expect(parseJson(res).accessToken).toMatch(accessTokenMatch)
		expect(parseHeaders(res)['set-cookie']).toMatch(refreshTokenMatch)
	})

	test('POST › Successful 2FA login', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test2fa@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res)
		expectStatusCode(res, 200)
		expect(parseJson(res).intermediateToken).toMatch(intermediateTokenMatch)
	})

	test('POST › Invalid login', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'something',
				password: testingCredentials,
			},
		})

		await expect(login(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: 'Invalid email and/or password' })
	})

	test('POST › Invalid body', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(login(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: ApiError.fromCode(400).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'GET',
		})

		await expect(login(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
		expectSpecificObject(res, { error: ApiError.fromCode(405).message })
	})
})
