import { TokenType } from 'types'

import { setUser } from '@sentry/nextjs'

import { apiHandler, getJwtToken, updateTransaction } from 'lib/api'
import { authenticate, setRefreshCookie } from 'lib/middleware'

export default apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' }).get(async (req, res) => {
	const { sub, username, role, userId, steamId } = await authenticate(req, { type: TokenType.Refresh })

	const [refreshToken, accessToken] = await Promise.all([
		getJwtToken({ sub, username, role, userId, steamId }, { type: TokenType.Refresh }),
		getJwtToken({ sub, username, role, userId, steamId }),
	])

	setRefreshCookie(res, refreshToken)
	setUser({ id: userId, username, email: sub })
	updateTransaction({ data: [{ label: 'user', value: userId }] })
	return res.status(200).json({ accessToken })
})
