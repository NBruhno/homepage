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

		await follow(req, res, 'biomutant')
	})

	beforeAll(async () => {
		const { req, res } = createMocks({
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await unfollow(req, res, 'cyberpunk-2077').catch()
	})

	test('POST › Follow game', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			headers: {
				authorization: `Bearer ${testingToken}`,
			},
		})

		await follow(req, res, 'cyberpunk-2077')
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

		await follow(req, res, 'biomutant')
		expectStatusCode(res, 200)
		expectSpecificObject(res, { message: 'Successfully followed the game' })
	})

	test('POST › Not authenticated', async () => {
		const { req, res } = createMocks({
			method: 'POST',
		})

		await expect(follow(req, res, 'cyberpunk-2077')).rejects.toThrow(ApiError)
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

		await expect(follow(req, res, 'cyberpunk-2077')).rejects.toThrow(ApiError)
		expectStatusCode(res, 405)
	})
})
