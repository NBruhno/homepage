import { TokenType } from 'types'

import { setUser, withSentry } from '@sentry/nextjs'

import { authenticate, setRefreshCookie } from 'api/middleware'
import { apiHandler, getJwtToken, updateTransaction } from 'api/utils'

const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const { secret, sub, displayName, role, userId } = authenticate(req, { type: TokenType.Refresh })

		const [accessToken, newRefreshToken] = await Promise.all([
			getJwtToken(secret, { sub, displayName, role, userId }),
			getJwtToken(secret, { sub, displayName, role, userId }, { type: TokenType.Refresh }),
		])

		setRefreshCookie(res, newRefreshToken)
		setUser({ id: userId, username: displayName, email: sub })
		updateTransaction({ data: [{ label: 'user', value: userId }] })
		res.status(200).json({ accessToken })
	})

export default withSentry(handler)
