import { errors } from 'faunadb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'
import { parseJson, expectStatusCode, expectSpecificObject, testingCredentials, transaction } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { login } from './login'
import { logout } from './logout'

let accessToken = null as string
describe('/api/users/logout', () => {
	beforeAll(async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(req, res, { transaction })
		accessToken = parseJson(res).accessToken
	})

	test('POST › Logout', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await logout(req, res, { transaction })
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'You have been logged out successfully' })
	})

	test('POST › Logout already logged out session', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await expect(logout(req, res, { transaction })).rejects.toThrow(errors.Unauthorized)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'You have been logged out successfully' })
	})

	test('POST › Unauthorized', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
		})

		await expect(logout(req, res, { transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
		})

		await expect(logout(req, res, { transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
