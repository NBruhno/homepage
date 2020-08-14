import { createMocks } from 'node-mocks-http'

import { expectStatusCode, expectSpecificObject } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { check } from './check'

describe('/api/auth/check', () => {
	test('POST › Email exists', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: { email: 'mail+test@bruhno.dev' },
		})

		await check(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { userExists: true })
	})

	test('POST › Email does not exist', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: { email: 'something' },
		})

		await check(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { userExists: false })
	})

	test('POST › Invalid body', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(check(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'GET',
		})

		await expect(check(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
