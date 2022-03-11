import type { TestResponse } from '../utils'

import supertest from 'supertest'

import login from 'pages/api/users/login'
import handler from 'pages/api/users/refresh'

import { ApiError } from 'api/errors'

import { createCredentials, accessTokenMatch, refreshTokenMatch, createTestServer } from '../utils'

let refreshToken = null as unknown as string
const { email, defaultPassword } = createCredentials()

describe('/api/users/refresh', () => {
	beforeAll(async () => {
		const server = createTestServer(login)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email,
				password: defaultPassword,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			}) as unknown as TestResponse & { headers: { 'set-cookie': Array<string> } }

		refreshToken = res.headers['set-cookie'][0]
		server.close()
	})

	test('GET › Refresh token', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)

		const res = await supertest(server)
			.get('/api/users/refresh')
			// eslint-disable-next-line @typescript-eslint/naming-convention
			.set('Cookie', refreshToken) as unknown as TestResponse & { body: { accessToken: string }, headers: { 'set-cookie': Array<string> | undefined } }

		expect(res.status).toBe(200)
		expect(res.body.accessToken).toMatch(accessTokenMatch)
		expect(res.headers['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(res.headers['set-cookie']?.[1]).toMatch('true')
		server.close()
	})

	test('GET › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)

		const res = await supertest(server)
			.get('/api/users/refresh')

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)

		const res = await supertest(server)
			.post('/api/users/refresh')
			.set('Cookie', refreshToken)

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
