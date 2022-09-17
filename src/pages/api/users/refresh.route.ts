import { UserTokenType } from 'types'

import { setUser, withSentry } from '@sentry/nextjs'

import { apiHandler, getJwtToken, updateTransaction } from 'lib/api'
import { authenticate, setRefreshCookie } from 'lib/middleware'

const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { sub, username, role, userId, steamId } = authenticate(req, { type: UserTokenType.Refresh })

		const [refreshToken, accessToken] = await Promise.all([
			getJwtToken({ sub, username, role, userId, steamId }, { type: UserTokenType.Refresh }),
			getJwtToken({ sub, username, role, userId, steamId }),
		])

		setRefreshCookie(res, refreshToken)
		setUser({ id: userId, username, email: sub })
		updateTransaction({ data: [{ label: 'user', value: userId }] })
		return res.status(200).json({ accessToken })
	})

export default withSentry(handler)
