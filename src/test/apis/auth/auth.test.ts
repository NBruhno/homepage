/* eslint-disable no-underscore-dangle */
import { isString } from 'lodash'
import { createMocks } from 'node-mocks-http'

import { check, login } from '../../../server/routes/auth'
import { ApiError } from '../../../server/errors/ApiError'

import { parseJson, expectStatusCode, expectSpecificObject } from '../utils'

describe('/api/auth', () => {
	// Email check
	test('/check - Email exists', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: { email: 'mail@bruhno.com' },
		})

		await check(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { userExists: true })
	})
	test('/check - Email does not exist', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: { email: 'something' },
		})

		await check(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { userExists: false })
	})

	// Login
	test('/login - Success', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: 'test1234',
			},
		})

		await login(req, res)
		expectStatusCode(res, 200)
		expect(isString(parseJson(res).accessToken))
	})

	test('/login - Invalid login', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'something',
				password: 'test1234',
			},
		})

		await expect(login(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: 'Invalid email and/or password' })
	})
})
