/* eslint-disable no-underscore-dangle */
import { isString } from 'lodash'
import { createMocks } from 'node-mocks-http'
import { check, login } from '../../../server/routes/auth'

describe('/api/auth - AUTH API', () => {
	// Email check
	test('/check - Email exists', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: { email: 'mail@bruhno.com' },
		})

		await check(req, res)
		expect(res._getStatusCode()).toBe(200)
		expect(JSON.parse(res._getData())).toEqual(expect.objectContaining({
			userExists: true,
		}))
	})
	test('/check - Email does not exist', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: { email: 'something' },
		})

		await check(req, res)
		expect(res._getStatusCode()).toBe(200)
		expect(JSON.parse(res._getData())).toEqual(expect.objectContaining({
			userExists: false,
		}))
	})

	// Login
	test('/login - Successful attempt', async () => {
		const { req, res } = createMocks({
			method: 'POST',
			body: {
				email: 'mail+test@bruhno.dev',
				password: 'test1234',
			},
		})

		await login(req, res)
		expect(res._getStatusCode()).toBe(200)
		expect(isString(JSON.parse(res._getData()).accessToken))
	})
})
