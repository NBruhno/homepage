import type { NextApiRequest, NextApiResponse } from 'next'

import { createMocks } from 'node-mocks-http'

import { parseJson, testingCredentials, expectSpecificObject, expectStatusCode, testingAccessCode } from 'test/utils'

import { decodeJwtToken } from 'lib/decodeJwtToken'

import { ApiError } from 'api/errors'

import { login } from './login'
import { user } from './user'
import { users } from './users'

let accessToken = null as unknown as string
let userId = null as unknown as string

describe('/api/users/{userId}', () => {
	beforeAll(async () => {
		const { req: registerReq, res: registerRes } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'mail+testdelete@bruhno.dev',
				displayName: 'Test delete',
				password: testingCredentials,
				accessCode: testingAccessCode,
			},
		})

		const { req: loginReq, res: loginRes } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				email: 'mail+testdelete@bruhno.dev',
				password: testingCredentials,
			},
		})

		try {
			await users(registerReq, registerRes)
			accessToken = parseJson(registerRes).accessToken
			userId = decodeJwtToken(parseJson(registerRes).accessToken).userId
		} catch (error) {
			if (error.statusCode === 400) {
				await login(loginReq, loginRes)
				accessToken = parseJson(loginRes).accessToken
				userId = decodeJwtToken(parseJson(loginRes).accessToken).userId
			}
		}
	})

	test('DELETE › Delete user', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await user(req, res, { userId })
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Your user has been deleted' })
	})

	test('DELETE › Not authenticated', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'DELETE',
		})

		await expect(user(req, res, { userId })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'TRACE',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await expect(user(req, res, { userId })).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
