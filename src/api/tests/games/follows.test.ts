import supertest from 'supertest'

import handler from 'pages/api/games/[id]/follows'
import login from 'pages/api/users/login'

import { ApiError } from 'api/errors'

import { createCredentials, createTestServer } from '../utils'

const { email, defaultPassword } = createCredentials()

let accessToken = null as unknown as string

describe('/api/games/{id}/follows', () => {
	beforeAll(async () => {
		const loginServer = createTestServer(login)
		const loginRes = await supertest(loginServer)
			.post('/api/users/login')
			.send({
				email,
				password: defaultPassword,
			}) as unknown as Omit<Response, 'body'> & { body: { accessToken: string } }

		accessToken = loginRes.body.accessToken
		loginServer.close()

		await Promise.all([
			async () => {
				const id = 54842
				const server = createTestServer(handler, { id })
				await supertest(server)
					.post(`/api/games/${id}/follows`)
					.set('authorization', `Bearer ${accessToken}`)
					.send({
						isFollowing: true,
					})
				server.close()
			},
			async () => {
				const id = 1877
				const server = createTestServer(handler, { id })
				await supertest(server)
					.post(`/api/games/${id}/follows`)
					.set('authorization', `Bearer ${accessToken}`)
					.send({
						isFollowing: false,
					})
					.catch()
				server.close()
			},
			async () => {
				const id = 101440
				const server = createTestServer(handler, { id })
				await supertest(server)
					.post(`/api/games/${id}/follows`)
					.set('authorization', `Bearer ${accessToken}`)
					.send({
						isFollowing: true,
					})
				server.close()
			},
		])
	})

	test('POST › Follow game', async () => {
		const id = 1877
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				isFollowing: true,
			})

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Successfully followed the game' })
		server.close()
	})

	test('POST › Follow a game that is already followed', async () => {
		const id = 54842
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				isFollowing: true,
			})

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Successfully followed the game' })
		server.close()
	})

	test('POST › Unfollow game', async () => {
		const id = 101440
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				isFollowing: false,
			})

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Successfully unfollowed the game' })
		server.close()
	})

	test('POST › Unfollow game that is not followed', async () => {
		const id = 76747
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				isFollowing: false,
			})

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Successfully unfollowed the game' })
		server.close()
	})

	test('POST › Not authenticated', async () => {
		const id = 1877
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/games/${id}/follows`)
			.send({
				isFollowing: true,
			})

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
