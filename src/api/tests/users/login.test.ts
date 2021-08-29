import supertest from 'supertest'
import { testingCredentials, accessTokenMatch, intermediateTokenMatch, refreshTokenMatch, createTestServer } from 'test/utils'

import handler from 'pages/api/users/login'

import { ApiError } from 'api/errors'

describe('/api/users/login', () => {
	test('Successful login', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)

		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email: 'mail+test@bruhno.dev',
				password: testingCredentials,
			})

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
				email: 'mail+test2fa@bruhno.dev',
				password: testingCredentials,
			})

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
				password: testingCredentials,
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
				email: 'mail+test2fa@bruhno.dev',
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
				password: testingCredentials,
			})

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
				email: 'mail+test2fa@bruhno.dev',
				password: 'to.short',
			})

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
				email: 'mail+test2fa@bruhno.dev',
				password: 'this.is.a.way.to.long.password.for.it.to.be.accepted.by.the.validator',
			})

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: password/)
		server.close()
	})

	test('POST › Invalid body (empty)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post('/api/users/login')

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
				email: 'mail+test2fa@bruhno.dev',
				password: testingCredentials,
				extra: 'this.should.error.out',
			})

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
			})

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
