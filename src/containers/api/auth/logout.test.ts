import { createMocks } from 'node-mocks-http'
import { errors } from 'faunadb'

import { parseJson, expectStatusCode, expectSpecificObject, testingCredentials } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { logout } from './logout'
import { login } from './login'

let accessToken = null as string
describe('/api/auth/logout', () => {
	beforeAll(async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res)
		accessToken = parseJson(res).accessToken
	})

	test('POST › Logout', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await logout(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'You have been logged out successfully' })
	})

	test('POST › Logout already logged out session', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await expect(logout(req, res)).rejects.toThrow(errors.Unauthorized)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'You have been logged out successfully' })
	})

	test('POST › Unauthorized', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(logout(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'GET',
		})

		await expect(logout(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
