import { UserTokenType } from 'types'

import { getJwtToken } from 'lib/api'
import { parseHeaders, refreshTokenMatch, createHttpMock } from 'lib/test'

import { setRefreshCookie, removeRefreshCookie } from './cookies'

describe('/lib/middleware/cookie', () => {
	test('setRefreshCookie › Set cookie', async () => {
		const { res } = createHttpMock()

		const refreshToken = getJwtToken({}, { type: UserTokenType.Refresh })
		setRefreshCookie(res, refreshToken)

		expect(parseHeaders(res)['set-cookie']?.[0]).toMatch(refreshTokenMatch)
		expect(parseHeaders(res)['set-cookie']?.[1]).toMatch('true')
	})

	test('removeRefreshCookie › Remove cookie', async () => {
		const { res } = createHttpMock()

		const refreshToken = getJwtToken({}, { type: UserTokenType.Refresh })
		setRefreshCookie(res, refreshToken)
		removeRefreshCookie(res)
		expect(parseHeaders(res)['set-cookie']?.[0]).toBe('refreshToken=; Max-Age=-1; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict')
		expect(parseHeaders(res)['set-cookie']?.[1]).toBe('refreshTokenExists=; Max-Age=-1; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict')
	})
})
