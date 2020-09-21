import { NextApiRequest, NextApiResponse } from 'next'
import { createMocks } from 'node-mocks-http'
import { randomBytes } from 'crypto'

import { testingToken, testingUserId, expectSpecificObject, expectStatusCode, transaction } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { changePassword } from './changePassword'

describe('/api/users/{userId}/changePassword', () => {
	test('POST › Change password', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				newPassword: randomBytes(20).toString('hex'),
			},
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await changePassword(req, res, { userId: testingUserId, transaction })
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Your password has been updated' })
	})

	test('POST › Invalid body', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(changePassword(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
	})

	test('POST   › Not authenticated', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				newPassword: randomBytes(20).toString('hex'),
			},
		})

		await expect(changePassword(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'GET',
			body: {
				newPassword: randomBytes(20).toString('hex'),
			},
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(changePassword(req, res, { userId: testingUserId, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
