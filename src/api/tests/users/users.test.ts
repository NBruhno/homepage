import supertest from 'supertest'
import { testingCredentials, accessTokenMatch, refreshTokenMatch, testingAccessCode, createTestServer } from 'test/utils'

import handler from 'pages/api/users'
import user from 'pages/api/users/[id]'
import login from 'pages/api/users/login'

import { decodeJwtToken } from 'lib/decodeJwtToken'

import { ApiError } from 'api/errors'

describe('/api/users', () => {
	beforeAll(async () => {
		const loginServer = createTestServer(login)
		const loginRes = await supertest(loginServer)
			.post('/api/users/login')
			.send({
				email: 'mail+testregister@bruhno.dev',
				password: testingCredentials,
			})

		const { userId } = decodeJwtToken(loginRes.body.accessToken)

		const deleteServer = createTestServer(user, { userId })
		await supertest(deleteServer)
			.delete(`/api/users/${userId}`)
			.set('authorization', `Bearer ${loginRes.body.accessToken}`)
		loginServer.close()
		deleteServer.close()
	})

	test('POST › Register successfully', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users')
			.send({
				email: 'mail+testregister@bruhno.dev',
				password: testingCredentials,
				displayName: 'Test register',
				accessCode: testingAccessCode,
			})

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
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
				displayName: 'Test already exist register',
				accessCode: testingAccessCode,
			})

		expect(res.status).toBe(400)
		expect(res.body).toStrictEqual({ message: 'Email is already in use' })
		server.close()
	})

	test.todo('Add test for all values in the body')

	test('POST › Invalid body (empty)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users')

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
