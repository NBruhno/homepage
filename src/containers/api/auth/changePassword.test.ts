import { createMocks } from 'node-mocks-http'
import { randomBytes } from 'crypto'

import { testingToken, expectSpecificObject, expectStatusCode } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { changePassword } from './changePassword'

describe('/api/auth/changePassword', () => {
	test('POST   › Change password', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				newPassword: randomBytes(20).toString('hex'),
			},
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await changePassword(req, res)
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Your password has been updated' })
	})

	test('POST   › Invalid body', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(changePassword(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
	})

	test('POST   › Not authenticated', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				newPassword: randomBytes(20).toString('hex'),
			},
		})

		await expect(changePassword(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
	})

	test('ERRORS › Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			body: {
				newPassword: randomBytes(20).toString('hex'),
			},
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(changePassword(req, res)).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
