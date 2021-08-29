import { TokenType } from 'types'

import { createMocks } from 'node-mocks-http'
import { parseHeaders, refreshTokenMatch } from 'test/utils'

import { getJwtToken } from 'api/utils'

import { setRefreshCookie, removeRefreshCookie } from './cookies'

describe('/api/middleware/cookie', () => {
	test('setRefreshCookie › Set cookie', async () => {
		const { res } = createMocks()

		const refreshToken = getJwtToken('secret', {}, { type: TokenType.Refresh })
		setRefreshCookie(res, refreshToken)

		expect(parseHeaders(res)['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(parseHeaders(res)['set-cookie']?.[1]).toMatch('true')
	})

	test('removeRefreshCookie › Remove cookie', async () => {
		const { res } = createMocks()

		const refreshToken = getJwtToken('secret', {}, { type: TokenType.Refresh })
		setRefreshCookie(res, refreshToken)
		removeRefreshCookie(res)
		expect(parseHeaders(res)['set-cookie']?.[0]).toBe('refreshToken=; Max-Age=-1; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict')
		expect(parseHeaders(res)['set-cookie']?.[1]).toBe('refreshTokenExists=; Max-Age=-1; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict')
	})
})
