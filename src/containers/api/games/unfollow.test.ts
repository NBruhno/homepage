import { createMocks } from 'node-mocks-http'
import { expectStatusCode, expectSpecificObject, testingToken, transaction } from 'test/utils'

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

		await follow(req, res, { gameId: 101440, transaction })
	})

	test('PATCH › Unfollow game', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await unfollow(req, res, { gameId: 101440, transaction })
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

		await expect(unfollow(req, res, { gameId: 76747, transaction })).rejects.toThrow()
		expectStatusCode(res, 404)
		expectSpecificObject(res, { error: ApiError.fromCode(404).message })
	})

	test('PATCH › Not authenticated', async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
		})

		await expect(unfollow(req, res, { gameId: 101440, transaction })).rejects.toThrow(ApiError)
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

		await unfollow(req, res, { gameId: 1877, transaction })
		expectStatusCode(res, 405)
	})
})
