import supertest from 'supertest'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { ApiError } from 'lib/errors'
import { userLogin, createTestServer } from 'lib/test'

import handler from './index.route'

let accessToken = null as unknown as string
let id = null as unknown as string

describe('/api/users/{userId}', () => {
	beforeAll(async () => {
		accessToken = (await userLogin({ label: 'delete' })).accessToken!
		id = decodeJwtToken(accessToken).userId
	})

	test('DELETE › Delete user', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.delete(`/api/users/${id}`)
			.set('authorization', `Bearer ${accessToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'The user has been deleted' })
		server.close()
	})

	test('DELETE › User does not exist', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: 1234 })
		const res = await supertest(server)
			.delete(`/api/users/${1234}`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('DELETE › Not authenticated', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.delete(`/api/users/${id}`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.trace(`/api/users/${id}`)
			.set('authorization', `Bearer ${accessToken}`)

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
