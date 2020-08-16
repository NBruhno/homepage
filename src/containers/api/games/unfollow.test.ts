import { createMocks } from 'node-mocks-http'

import { expectStatusCode, expectSpecificObject, testingToken } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { follow } from './follow'
import { unfollow } from './unfollow'

describe('/api/games/follow', () => {
	beforeAll(async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await follow(req, res, 'stalker-2')
	})

	test('PATCH › Unfollow game', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await unfollow(req, res, 'stalker-2')
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Successfully unfollowed the game' })
	})

	test('PATCH › Unfollow game that is not followed', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(unfollow(req, res, 'atomic-heart')).rejects.toThrow(ApiError)
		expectStatusCode(res, 404)
		expectSpecificObject(res, { error: ApiError.fromCode(404).message })
	})

	test('PATCH › Not authenticated', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
		})

		await expect(unfollow(req, res, 'stalker-2')).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await expect(unfollow(req, res, 'cyberpunk-2077')).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
