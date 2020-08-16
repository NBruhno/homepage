import { createMocks } from 'node-mocks-http'

import { parseJson, parseHeaders, testingCredentials, expectStatusCode, expectSpecificObject, accessTokenMatch, refreshTokenMatch } from 'test/utils'
import { logger } from 'lib/logger'

import { ApiError } from '../errors/ApiError'

import { deleteUser } from './delete'
import { login } from './login'
import { register } from './register'

describe('/api/auth/register', () => {
	beforeAll(async () => {
		const { req: loginReq, res: loginRes } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+testregister@bruhno.dev',
				password: testingCredentials,
			},
		})

		await login(loginReq, loginRes).then(async () => {
			const { req: deleteReq, res: deleteRes } = createMocks({
				method: 'POST',
				headers: {
					authorization: `Bearer ${parseJson(loginRes).accessToken}`,
				},
				body: {
					email: 'mail+testregister@bruhno.dev',
					password: testingCredentials,
				},
			})

			await deleteUser(deleteReq, deleteRes).catch((error) => logger.debug(error))
		}).catch((error) => logger.debug(error))
	})

	test('POST › Register successfully', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+testregister@bruhno.dev',
				password: testingCredentials,
				displayName: 'Test register',
			},
		})

		await register(req, res)
		expectStatusCode(res, 200)
		expect(parseJson(res).accessToken).toMatch(accessTokenMatch)
		expect(parseHeaders(res)['set-cookie']).toMatch(refreshTokenMatch)
	})

	test('POST › Register already existing email', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
				displayName: 'Test already exist register',
			},
		})

		await register(req, res)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: 'Email is already in use' })
	})

	test('POST › Invalid body', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(register(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
		expectSpecificObject(res, { error: ApiError.fromCode(400).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'GET',
		})

		await expect(register(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
		expectSpecificObject(res, { error: ApiError.fromCode(405).message })
	})
})
