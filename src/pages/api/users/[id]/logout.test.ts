import supertest from 'supertest'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { ApiError } from 'lib/errors'
import { type TestResponse, createTestServer, userLogin } from 'lib/test'

import handler from './logout.route'

let accessToken = null as unknown as string
let id = null as unknown as string

describe('/api/users/{userId}/logout', () => {
	beforeAll(async () => {
		accessToken = (await userLogin({})).accessToken!
		id = decodeJwtToken(accessToken).userId
	})

	test('POST › Logout', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/logout`)
			.set('authorization', `Bearer ${accessToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'You have been logged out successfully' })
		server.close()
	})

	test('POST › Logout already logged out session', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/logout`)
			.set('authorization', `Bearer ${accessToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'You have been logged out successfully' })
		server.close()
	})

	test('POST › User does not exist', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: '1234' })
		const res = await supertest(server)
			.post(`/api/users/${1234}/logout`)
			.set('authorization', `Bearer ${accessToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'You have been logged out successfully' })
		server.close()
	})

	test('POST › Not authenticated', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/logout`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('POST › Invalid query', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post(`/api/users/./changePassword`)
			.set('authorization', `Bearer ${accessToken}`) as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.get(`/api/users/${id}/logout`)

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
