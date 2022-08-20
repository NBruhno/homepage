import { UserTokenType } from 'types'

import { setUser, withSentry } from '@sentry/nextjs'

import { apiHandler, getJwtToken, updateTransaction } from 'lib/api'
import { authenticate, setRefreshCookie } from 'lib/middleware'

const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { sub, username, role, userId, steamId } = authenticate(req, { type: UserTokenType.Refresh })

		setRefreshCookie(res, getJwtToken({ sub, username, role, userId, steamId }, { type: UserTokenType.Refresh }))
		setUser({ id: userId, username, email: sub })
		updateTransaction({ data: [{ label: 'user', value: userId }] })
		return res.status(200).json({ accessToken: getJwtToken({ sub, username, role, userId, steamId }) })
	})

export default withSentry(handler)
