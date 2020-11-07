import { createMocks } from 'node-mocks-http'

import { parseHeaders, refreshTokenMatch, transaction } from 'test/utils'
import { TokenTypes } from 'types/Token'

import { getJwtToken } from '../getJwtToken'

import { setRefreshCookie, removeRefreshCookie } from './cookies'

describe('/api/middleware/cookie', () => {
	test('setRefreshCookie › Set cookie', async () => {
		const { res } = createMocks()

		const refreshToken = getJwtToken('secret', {}, { type: TokenTypes.Refresh, transaction })
		setRefreshCookie(res, refreshToken, transaction)

		expect(parseHeaders(res)['set-cookie']).toMatch(refreshTokenMatch)
	})

	test('removeRefreshCookie › Remove cookie', async () => {
		const { res } = createMocks()

		const refreshToken = getJwtToken('secret', {}, { type: TokenTypes.Refresh, transaction })
		setRefreshCookie(res, refreshToken, transaction)
		removeRefreshCookie(res, transaction)
		expect(parseHeaders(res)['set-cookie']).toBe('refreshToken=; Max-Age=-1; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict')
	})
})
