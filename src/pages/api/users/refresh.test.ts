import supertest from 'supertest'

import { ApiError } from 'lib/errors'
import { type TestResponse, createCredentials, accessTokenMatch, refreshTokenMatch, createTestServer, userLogin } from 'lib/test'

import handler from './refresh.route'

let refreshToken: string
const { email, username, defaultPassword, accessCode } = createCredentials({ label: 'refresh' })

describe('/api/users/refresh', () => {
	beforeAll(async () => {
		refreshToken = (await userLogin({ email, username, accessCode, password: defaultPassword })).refreshToken!
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
