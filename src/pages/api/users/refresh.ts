import { UserTokenType } from 'types'

import { setUser, withSentry } from '@sentry/nextjs'

import { authenticate, setRefreshCookie } from 'api/middleware'
import { apiHandler, getJwtToken, updateTransaction } from 'api/utils'

const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { sub, username, role, userId } = authenticate(req, { type: UserTokenType.Refresh })

		setRefreshCookie(res, getJwtToken({ sub, username, role, userId }, { type: UserTokenType.Refresh }))
		setUser({ id: userId, username, email: sub })
		updateTransaction({ data: [{ label: 'user', value: userId }] })
		return res.status(200).json({ accessToken: getJwtToken({ sub, username, role, userId }) })
	})

export default withSentry(handler)
