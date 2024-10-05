import { randomBytes } from 'crypto'

import supertest from 'supertest'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { ApiError } from 'lib/errors'
import type { TestResponse } from 'lib/test'
import { createCredentials, createTestServer } from 'lib/test'

import users from '../index.route'

import handler from './changePassword.route'
import user from './index.route'

const { email, password, defaultPassword, username, accessCode } = createCredentials({ label: 'change-password', shouldPrefixEmail: true })
let accessToken = null as unknown as string
let id = null as unknown as string

describe('/api/users/{userId}/changePassword', () => {
	beforeAll(async () => {
		const usersServer = createTestServer(users)
		const res = await supertest(usersServer)
			.post('/api/users')
			.send({
				email,
				username,
				password: defaultPassword,
				accessCode,
			}) as unknown as TestResponse & { body: { accessToken: string } }

		if (res.status !== 200) {
			const deleteServer = createTestServer(user, { id })
			await supertest(deleteServer)
				.delete(`/api/users/${id}`)
				.set('authorization', `Bearer ${accessToken}`)
			deleteServer.close()

			const res = await supertest(usersServer)
				.post('/api/users')
				.send({
					email,
					username,
					password: defaultPassword,
					accessCode,
				}) as unknown as TestResponse & { body: { accessToken: string } }
			accessToken = res.body.accessToken
			id = decodeJwtToken(res.body.accessToken).userId
		} else {
			accessToken = res.body.accessToken
			id = decodeJwtToken(res.body.accessToken).userId
		}
		usersServer.close()
	})

	afterAll(async () => {
		const deleteServer = createTestServer(user, { id })
		await supertest(deleteServer)
			.delete(`/api/users/${id}`)
			.set('authorization', `Bearer ${accessToken}`)
		deleteServer.close()
	})

	test('POST › Change password', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/changePassword`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				currentPassword: defaultPassword,
				newPassword: password,
			})

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: 'Password has been updated' })
		server.close()
	})

	test('POST › Not authenticated', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/changePassword`)
			.send({
				newPassword: password,
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('POST › Invalid password (short)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/changePassword`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				currentPassword: password,
				newPassword: randomBytes(6).toString('hex'),
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: newPassword/)
		server.close()
	})

	test('POST › Invalid password (long)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/changePassword`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				currentPassword: password,
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
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				currentPassword: password,
				newPassword: randomBytes(20).toString('hex'),
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('POST › Invalid body (empty)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/changePassword`)
			.set('authorization', `Bearer ${accessToken}`) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('POST › Invalid body (extra)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/changePassword`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				currentPassword: password,
				newPassword: randomBytes(20).toString('hex'),
				extra: 'this.should.error.out',
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: extra/)
		server.close()
	})

	test('POST › Invalid body (missing)', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/changePassword`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				newPassword: randomBytes(20).toString('hex'),
			}) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/At path: currentPassword/)
		server.close()
	})

	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.get(`/api/users/${id}/changePassword`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				currentPassword: password,
				newPassword: randomBytes(20).toString('hex'),
			})

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
