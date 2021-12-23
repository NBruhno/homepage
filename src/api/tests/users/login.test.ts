import type { TestResponse } from '../utils'

import supertest from 'supertest'

import handler from 'pages/api/users/login'

import { ApiError } from 'api/errors'

import { createCredentials, accessTokenMatch, createTestServer, intermediateTokenMatch, refreshTokenMatch } from '../utils'

const { email, defaultPassword } = createCredentials()
const { email: twoFactorEmail } = createCredentials({ label: '2fa' })

describe('/api/users/login', () => {
	test('POST › Successful login', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)

		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email,
				password: defaultPassword,
			}) as unknown as TestResponse & { body: { accessToken: string }, headers: { 'set-cookie': Array<string> | undefined } }

		expect(res.status).toBe(200)
		expect(res.body.accessToken).toMatch(accessTokenMatch)
		expect(res.headers['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(res.headers['set-cookie']?.[1]).toMatch('true')
		server.close()
	})

	test('POST › Successful 2FA login', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email: twoFactorEmail,
				password: defaultPassword,
			}) as unknown as TestResponse & { body: { intermediateToken: string } }

		expect(res.status).toBe(200)
		expect(res.body.intermediateToken).toMatch(intermediateTokenMatch)
		server.close()
	})

	test('POST › Invalid login (email)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email: 'thereisnowaythat@thiswilleverexist.nope',
				password: defaultPassword,
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: 'Invalid email and/or password' })
		server.close()
	})

	test('POST › Invalid login (password)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email,
				password: 'this.is.not.the.right.password',
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: 'Invalid email and/or password' })
		server.close()
	})

	test('POST › Invalid email', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email: 'something.that.is.not.an.email',
				password: defaultPassword,
			}) as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: email/)
		server.close()
	})

	test('POST › Invalid password (short)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email,
				password: 'to.short',
			}) as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: password/)
		server.close()
	})

	test('POST › Invalid password (long)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email,
				password: 'this.is.a.way.to.long.password.for.it.to.be.accepted.by.the.validator',
			}) as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: password/)
		server.close()
	})

	test('POST › Invalid body (empty)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login') as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('POST › Invalid body (extra)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email,
				password: defaultPassword,
				extra: 'this.should.error.out',
			}) as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: extra/)
		server.close()
	})

	test('POST › Invalid body (missing)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email: 'mail+test2fa@bruhno.dev',
			}) as unknown as TestResponse & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: password/)
		server.close()
	})

	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.get('/api/users/login')

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
