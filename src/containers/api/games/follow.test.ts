import { createMocks } from 'node-mocks-http'
import { expectStatusCode, expectSpecificObject, testingToken, transaction } from 'test/utils'

import { ApiError } from '../errors/ApiError'

import { follow } from './follow'
import { unfollow } from './unfollow'

describe('/api/games/{id}/follow', () => {
	beforeAll(async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await follow(req, res, { gameId: 54842, transaction })
	})

	beforeAll(async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await unfollow(req, res, { gameId: 1877, transaction }).catch()
	})

	test('POST › Follow game', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await follow(req, res, { gameId: 1877, transaction })
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Successfully followed the game' })
	})

	test('POST › Follow a game that is already followed', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await follow(req, res, { gameId: 54842, transaction })
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Successfully followed the game' })
	})

	test('POST › Not authenticated', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(follow(req, res, { gameId: 1877, transaction })).rejects.toThrow(ApiError)
		expectStatusCode(res, 401)
		expectSpecificObject(res, { error: ApiError.fromCode(401).message })
	})

	test('Invalid method', async () => {
		const { req, res } = createMocks({
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await follow(req, res, { gameId: 1877, transaction })
		expectStatusCode(res, 405)
	})
})
