import type { FaunaUser } from 'types'
import { TokenType } from 'types'

import { setUser, withSentry } from '@sentry/nextjs'
import { query as q, errors } from 'faunadb'
import { object, create } from 'superstruct'

import { monitorReturn, monitorReturnAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { setRefreshCookie } from 'api/middleware'
import { serverClient, getJwtToken, apiHandler } from 'api/utils'
import { email, password } from 'api/validation'

const Body = object({
	email: email(),
	password: password(),
})

export const handler = apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		const { email, password } = create(req.body, Body)

		const { data: { displayName, role, twoFactorSecret }, secret, ref } = await monitorReturnAsync(
			() => serverClient().query<FaunaUser>(q.Merge(
				q.Login(q.Match(q.Index('usersByEmail'), email), { password }),
				q.Get(q.Match(q.Index('usersByEmail'), email)),
			)).catch((error) => {
				if (error instanceof errors.BadRequest) throw ApiError.fromCodeWithError(401, new Error('Invalid email and/or password'))
				throw error
			}), 'fanaudb - Merge(Login(), Get())',
		)

		const userId = monitorReturn(
			() => ref.toString().split(',')[1].replace(/[") ]/gi, ''),
			'userId',
		)

		setUser({ id: userId, username: displayName, email })

		if (twoFactorSecret) {
			const intermediateToken = getJwtToken(secret,
				{ sub: email, displayName, role, userId },
				{ type: TokenType.Intermediate })

			res.status(200).json({ intermediateToken })
		} else {
			const accessToken = getJwtToken(secret, { sub: email, displayName, role, userId })
			const refreshToken = getJwtToken(secret, { sub: email, displayName, role, userId }, { type: TokenType.Refresh })
			setRefreshCookie(res, refreshToken)

			res.status(200).json({ accessToken })
		}
	})

export default withSentry(handler)
