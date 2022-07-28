import supertest from 'supertest'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { ApiError } from 'lib/errors'
import type { TestResponse } from 'lib/test'
import { createCredentials, accessTokenMatch, refreshTokenMatch, createTestServer } from 'lib/test'

import user from './[id]/index.route'
import handler from './index.route'
import login from './login.route'

const { email, username, accessCode, defaultPassword } = createCredentials({ label: 'register' })

describe('/api/users', () => {
	beforeAll(async () => {
		const loginServer = createTestServer(login)
		const loginRes = await supertest(loginServer)
			.post('/api/users/login')
			.send({
				email,
				password: defaultPassword,
			}) as unknown as TestResponse & { body: { accessToken: string } }

		if (loginRes.status === 200) {
			const { userId } = decodeJwtToken(loginRes.body.accessToken)

			const deleteServer = createTestServer(user, { id: userId })
			await supertest(deleteServer)
				.delete(`/api/users/${userId}`)
				.set('authorization', `Bearer ${loginRes.body.accessToken}`)
			deleteServer.close()
		}
		loginServer.close()
	})

	test('POST › Register successfully', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users')
			.send({
				email,
				password: defaultPassword,
				username,
				accessCode,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			}) as unknown as TestResponse & { body: { accessToken: string }, headers: { 'set-cookie': Array<string> | undefined } }

		expect(res.status).toBe(200)
		expect(res.body.accessToken).toMatch(accessTokenMatch)
		expect(res.headers['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(res.headers['set-cookie']?.[1]).toMatch('true')
		server.close()
	})

	test('POST › Register already existing email', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users')
			.send({
				email,
				password: defaultPassword,
				username,
				accessCode,
			})

		expect(res.status).toBe(409)
		expect(res.body).toStrictEqual({ message: 'Email is already in use' })
		server.close()
	})

	test.todo('Add test for all values in the body')

	test('POST › Invalid body (empty)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users') as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.get('/api/users')

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
