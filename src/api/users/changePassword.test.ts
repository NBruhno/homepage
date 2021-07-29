import type { NextApiRequest, NextApiResponse } from 'next'

import { randomBytes } from 'crypto'

import { createMocks } from 'node-mocks-http'

import { testingToken, testingUserId, expectSpecificObject, expectStatusCode } from 'test/utils'

import { ApiError } from 'api/errors'

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

		await changePassword(req, res, { userId: testingUserId })
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

		await expect(changePassword(req, res, { userId: testingUserId })).rejects.toThrow(ApiError)
		expectStatusCode(res, 400)
	})

	test('POST › Not authenticated', async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: 'POST',
			body: {
				newPassword: randomBytes(20).toString('hex'),
			},
		})

		await expect(changePassword(req, res, { userId: testingUserId })).rejects.toThrow(ApiError)
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

		await expect(changePassword(req, res, { userId: testingUserId })).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
