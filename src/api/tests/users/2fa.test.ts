import type { Response } from 'supertest'

import { authenticator } from 'otplib'
import supertest from 'supertest'

import handler from 'pages/api/users/[id]/2fa'
import login from 'pages/api/users/login'

import { decodeJwtToken } from 'lib/decodeJwtToken'

import { ApiError } from 'api/errors'

import { accessTokenMatch, refreshTokenMatch, retryWrapper, createTestServer, createCredentials } from '../utils'

let intermediateToken = null as unknown as string
let accessToken = null as unknown as string
let id = null as unknown as string

const { email, defaultPassword, twoFactorSecret } = createCredentials({ label: '2fa' })

describe('/api/users/{id}/2fa', () => {
	beforeAll(async () => {
		const loginServer = createTestServer(login)
		const loginRes = await supertest(loginServer)
			.post('/api/users/login')
			.send({
				email,
				password: defaultPassword,
			}) as unknown as Omit<Response, 'body'> & { body: { intermediateToken: string } }

		intermediateToken = loginRes.body.intermediateToken
		id = decodeJwtToken(intermediateToken).userId
		loginServer.close()

		const twoFactorServer = createTestServer(handler, { id })
		const twoFactorRes = await retryWrapper(() => supertest(twoFactorServer)
			.post(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${intermediateToken}`)
			.send({
				otp: authenticator.generate(twoFactorSecret),
			// eslint-disable-next-line @typescript-eslint/naming-convention
			}), 3) as unknown as Omit<Response, 'body' | 'headers'> & { body: { accessToken: string }, headers: { 'set-cookie': Array<string> | undefined } }

		accessToken = twoFactorRes.body.accessToken
		twoFactorServer.close()
	})

	afterAll(async () => {
		const server = createTestServer(handler, { id })
		await retryWrapper(() => supertest(server)
			.patch(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				otp: authenticator.generate(twoFactorSecret),
				secret: twoFactorSecret,
			}), 3)
		server.close()
	})

	/** ------- GET method ------- */
	test('GET › Get 2FA secret', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.get(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${accessToken}`) as unknown as Omit<Response, 'body'> & { body: { twoFactorSecret: string } }

		expect(res.status).toBe(200)
		expect(typeof res.body.twoFactorSecret).toBe('string')
	})

	test('GET › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.get(`/api/users/${id}/2fa`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	/** ------- PATCH method ------- */
	test('PATCH › Activate 2FA', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await retryWrapper(() => supertest(server)
			.patch(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${accessToken}`)
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
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.patch(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${accessToken}`)
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
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.patch(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${accessToken}`) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('PATCH › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.patch(`/api/users/${id}/2fa`)
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
		const server = createTestServer(handler, { id })
		const res = await retryWrapper(() => supertest(server)
			.post(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${intermediateToken}`)
			.send({
				otp: authenticator.generate(twoFactorSecret),
			// eslint-disable-next-line @typescript-eslint/naming-convention
			}), 3) as unknown as Omit<Response, 'body' | 'headers'> & { body: { accessToken: string }, headers: { 'set-cookie': Array<string> | undefined } }

		expect(res.status).toBe(200)
		expect(res.body.accessToken).toMatch(accessTokenMatch)
		expect(res.headers['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(res.headers['set-cookie']?.[1]).toMatch('true')
		server.close()
	})

	test('POST › Invalid OTP', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/2fa`)
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
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${intermediateToken}`) as unknown as Omit<Response, 'body'> & { body: { message: string } }

		expect(res.status).toBe(400)
		expect(res.body.message).toMatch(/Expected an object/)
		server.close()
	})

	test('POST › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.post(`/api/users/${id}/2fa`)
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
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.delete(`/api/users/${id}/2fa`)
			.set('authorization', `Bearer ${accessToken}`)

		expect(res.status).toBe(200)
		expect(res.body).toStrictEqual({ message: '2FA has been removed' })
		server.close()
	})

	test('DELETE › Unauthorized', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.delete(`/api/users/${id}/2fa`)

		expect(res.status).toBe(401)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(401).message })
		server.close()
	})

	/** ------- others ------- */
	test('Invalid method', async () => {
		expect.hasAssertions()
		const server = createTestServer(handler, { id })
		const res = await supertest(server)
			.put(`/api/users/${id}/2fa`)
			.send({ foo: 'bar' })

		expect(res.status).toBe(405)
		expect(res.body).toStrictEqual({ message: ApiError.fromCode(405).message })
		server.close()
	})
})
