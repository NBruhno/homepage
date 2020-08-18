import { createMocks } from 'node-mocks-http'

import { TokenTypes } from 'types/Token'
import { parseHeaders, refreshTokenMatch } from 'test/utils'

import { getJwtToken } from '../getJwtToken'

import { setRefreshCookie, removeRefreshCookie } from './cookies'

describe('/api/middleware/cookie', () => {
	test('setRefreshCookie › Set cookie', async () => {
		const { res } = createMocks()

		const refreshToken = getJwtToken('secret', {}, TokenTypes.Refresh)
		setRefreshCookie(res, refreshToken)

		expect(parseHeaders(res)['set-cookie']).toMatch(refreshTokenMatch)
	})

	test('removeRefreshCookie › Remove cookie', async () => {
		const { res } = createMocks()

		const refreshToken = getJwtToken('secret', {}, TokenTypes.Refresh)
		setRefreshCookie(res, refreshToken)
		removeRefreshCookie(res)
		expect(parseHeaders(res)['set-cookie']).toBe('refreshToken=; Max-Age=-1; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict')
	})
})
