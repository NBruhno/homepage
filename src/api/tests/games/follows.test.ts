import supertest from 'supertest'
import { testingToken, createTestServer } from 'test/utils'

import handler from 'pages/api/games/[id]/follows'

import { ApiError } from 'api/errors'

describe('/api/games/{id}/follows', () => {
	beforeAll(async () => {
		const id = 54842
		const server = createTestServer(handler, { id })
		await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${testingToken}`)
		server.close()
	})

	beforeAll(async () => {
		const id = 1877
		const server = createTestServer(handler, { id })
		await supertest(server)
			.patch(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${testingToken}`)
			.catch()
		server.close()
	})

	beforeAll(async () => {
		const id = 101440
		const server = createTestServer(handler, { id })
		await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${testingToken}`)
		server.close()
	})

	test('POST › Follow game', async () => {
		const id = 1877
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${testingToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Successfully followed the game' })
		server.close()
	})

	test('POST › Follow a game that is already followed', async () => {
		const id = 54842
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${testingToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Successfully followed the game' })
		server.close()
	})

	test('POST › Not authenticated', async () => {
		const id = 1877
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('PATCH › Unfollow game', async () => {
		const id = 101440
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.patch(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${testingToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Successfully unfollowed the game' })
		server.close()
	})

	test('PATCH › Unfollow game that is not followed', async () => {
		const id = 76747
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.patch(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${testingToken}`)

		expect(res.status).toBe(404)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(404).message })
		server.close()
	})

	test('PATCH › Not authenticated', async () => {
		const id = 101440
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.patch(`/api/games/${id}/follows`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('Invalid method', async () => {
		const id = 1877
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.delete(`/api/games/${id}/follows`)

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
