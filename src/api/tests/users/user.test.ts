import supertest from 'supertest'
import { testingCredentials, testingAccessCode, createTestServer } from 'test/utils'

import users from 'pages/api/users'
import handler from 'pages/api/users/[id]'
import login from 'pages/api/users/login'

import { decodeJwtToken } from 'lib/decodeJwtToken'

import { ApiError } from 'api/errors'

let accessToken = null as unknown as string
let id = null as unknown as string

describe('/api/users/{userId}', () => {
	beforeAll(async () => {
		const usersServer = createTestServer(users)
		const res = await supertest(usersServer)
			.post('/api/users')
			.send({
				email: 'mail+testdelete@bruhno.dev',
				displayName: 'Test delete',
				password: testingCredentials,
				accessCode: testingAccessCode,
			}) as unknown as Omit<Response, 'body'> & { body: { accessToken: string } }

		if (res.status !== 200) {
			const loginServer = createTestServer(login)
			const loginRes = await supertest(loginServer)
				.post('/api/users/login')
				.send({
					email: 'mail+testdelete@bruhno.dev',
					password: testingCredentials,
				}) as unknown as Omit<Response, 'body'> & { body: { accessToken: string } }
			accessToken = loginRes.body.accessToken
			id = decodeJwtToken(loginRes.body.accessToken).userId
			loginServer.close()
		} else {
			accessToken = res.body.accessToken
			id = decodeJwtToken(res.body.accessToken).userId
		}
		usersServer.close()
	})

	test('DELETE › Delete user', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.delete(`/api/users/${id}`)
			.set('authorization', `Bearer ${accessToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Your user has been deleted' })
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
