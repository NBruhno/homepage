import { authenticator } from 'otplib'
import supertest from 'supertest'
import { testingToken, testingCredentials, accessTokenMatch, refreshTokenMatch, retryFunction, createTestServer, testingUserId } from 'test/utils'

import handler from 'pages/api/users/[id]/2fa'
import login from 'pages/api/users/login'

import { decodeJwtToken } from 'lib/decodeJwtToken'

import { ApiError } from 'api/errors'

const twoFactorSecret = 'NBYTGTYQOVQCWHDA'
let intermediateToken = null as unknown as string
let userId = null as unknown as string

describe('/api/users/{userId}/2fa', () => {
	beforeAll(async () => {
		const server = createTestServer(login)
		const res = await supertest(server)
			.post('/api/users/login')
			.send({
				email: 'mail+test2fa@bruhno.dev',
				password: testingCredentials,
			})

		intermediateToken = res.body.intermediateToken
		userId = decodeJwtToken(intermediateToken).userId
		server.close()
	})

	/** ------- GET method ------- */
	test('GET › Get 2FA secret', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.get(`/api/users/${testingUserId}/2fa`)
			.set('authorization', `Bearer ${testingToken}`)

		expect(res.status).toBe(200)
		expect(typeof res.body.twoFactorSecret).toBe('string')
	})

	test('GET › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.get(`/api/users/${testingUserId}/2fa`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	/** ------- PATCH method ------- */
	test('PATCH › Activate 2FA', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await retryFunction(() => supertest(server)
			.patch(`/api/users/${testingUserId}/2fa`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				otp: authenticator.generate(twoFactorSecret),
				secret: twoFactorSecret,
			}), 3)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: '2FA has been activated' })
		server.close()
	})

	test('PATCH › Invalid OTP', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.patch(`/api/users/${testingUserId}/2fa`)
			.set('authorization', `Bearer ${testingToken}`)
			.send({
				otp: authenticator.generate('NBTNGYOYGVQCWHDA'),
				secret: twoFactorSecret,
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('PATCH › Invalid body', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.patch(`/api/users/${testingUserId}/2fa`)
			.set('authorization', `Bearer ${testingToken}`)

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('PATCH › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.patch(`/api/users/${testingUserId}/2fa`)
			.send({
				otp: authenticator.generate(twoFactorSecret),
				secret: twoFactorSecret,
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	/** ------- POST method ------- */
	test('POST › Verify 2FA', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId })
		const res = await retryFunction(() => supertest(server)
			.post(`/api/users/${userId}/2fa`)
			.set('authorization', `Bearer ${intermediateToken}`)
			.send({
				otp: authenticator.generate(twoFactorSecret),
			}), 3)

		expect(res.status).toBe(200)
		expect(res.body.accessToken).toMatch(accessTokenMatch)
		expect(res.headers['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(res.headers['set-cookie']?.[1]).toMatch('true')
		server.close()
	})

	test('POST › Invalid OTP', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId })
		const res = await supertest(server)
			.post(`/api/users/${userId}/2fa`)
			.set('authorization', `Bearer ${intermediateToken}`)
			.send({
				otp: authenticator.generate('NBTNGYOYGVQCWHDA'),
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	test('POST › Invalid body', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId })
		const res = await supertest(server)
			.post(`/api/users/${userId}/2fa`)
			.set('authorization', `Bearer ${intermediateToken}`)

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('POST › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId })
		const res = await supertest(server)
			.post(`/api/users/${userId}/2fa`)
			.send({
				otp: authenticator.generate(twoFactorSecret),
			})

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	/** ------- DELETE method ------- */
	test('DELETE › Remove 2FA', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.delete(`/api/users/${testingUserId}/2fa`)
			.set('authorization', `Bearer ${testingToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: '2FA has been removed' })
		server.close()
	})

	test('DELETE › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.delete(`/api/users/${testingUserId}/2fa`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	/** ------- others ------- */
	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { userId: testingUserId })
		const res = await supertest(server)
			.put(`/api/users/${testingUserId}/2fa`)
			.send({ foo: 'bar' })

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})