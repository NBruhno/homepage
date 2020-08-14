import { createMocks } from 'node-mocks-http'

import { parseJson, testingCredentials, expectSpecificObject, expectStatusCode } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { deleteUser } from './delete'
import { register } from './register'
import { login } from './login'

let accessToken = null as string

describe('/api/auth/deleteUser', () => {
	beforeAll(async () => {
		const { req: registerReq, res: registerRes } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+testdelete@bruhno.dev',
				displayName: 'Test delete',
				password: testingCredentials,
			},
		})

		const { req: loginReq, res: loginRes } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+testdelete@bruhno.dev',
				password: testingCredentials,
			},
		})

		try {
			await register(registerReq, registerRes)
			accessToken = parseJson(registerRes).accessToken
		} catch (error) {
			if (error.statusCode === 400) {
				await login(loginReq, loginRes)
				accessToken = parseJson(loginRes).accessToken
			}
		}
	})

	test('POST   › Delete user', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await deleteUser(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Your user has been deleted' })
	})

	test('POST   › Not authenticated', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(deleteUser(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
	})

	test('ERRORS › Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		})

		await expect(deleteUser(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
