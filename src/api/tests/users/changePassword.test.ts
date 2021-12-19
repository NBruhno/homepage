import { randomBytes } from 'crypto'

import supertest from 'supertest'
import { testingToken, testingUserId, createTestServer } from 'test/utils'

import handler from 'pages/api/users/[id]/changePassword'

import { ApiError } from 'api/errors'

describe('/api/users/{userId}/changePassword', () => {
	test('POST › Change password', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.post(`/api/users/${testingUserId}/changePassword`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				newPassword: randomBytes(20).toString('hex'),
			})

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Your password has been updated' })
		server.close()
	})

	test('POST › Not authenticated', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.post(`/api/users/${testingUserId}/changePassword`)
			.send({
				newPassword: randomBytes(20).toString('hex'),
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('POST › Invalid password (short)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.post(`/api/users/${testingUserId}/changePassword`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				newPassword: randomBytes(6).toString('hex'),
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: newPassword/)
		server.close()
	})

	test('POST › Invalid password (long)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.post(`/api/users/${testingUserId}/changePassword`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				newPassword: randomBytes(80).toString('hex'),
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: newPassword/)
		server.close()
	})

	test('POST › Invalid query', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler)
		const res = await supertest(server)
			.post(`/api/users/./changePassword`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				newPassword: randomBytes(20).toString('hex'),
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('POST › Invalid body (empty)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.post(`/api/users/${testingUserId}/changePassword`)
			.set('authorization', `Bearer ${testingToken}`) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('POST › Invalid body (extra)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.post(`/api/users/${testingUserId}/changePassword`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				newPassword: randomBytes(20).toString('hex'),
				extra: 'this.should.error.out',
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: extra/)
		server.close()
	})

	test('POST › Invalid body (missing)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.post(`/api/users/${testingUserId}/changePassword`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: newPassword/)
		server.close()
	})

	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id: testingUserId })
		const res = await supertest(server)
			.get(`/api/users/${testingUserId}/changePassword`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				newPassword: randomBytes(20).toString('hex'),
			})

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
