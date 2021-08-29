import type { FaunaUser } from 'types'
import { TokenType } from 'types'

import { setUser, withSentry } from '@sentry/nextjs'
import { query as q, errors } from 'faunadb'
import { object, string, create, size } from 'superstruct'

import { monitorReturn, monitorReturnAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { setRefreshCookie } from 'api/middleware'
import { serverClient, getJwtToken, apiHandler } from 'api/utils'
import { accessCode, email, password } from 'api/validation'

const Body = object({
	email: email(),
	password: password(),
	displayName: size(string(), 2, 64),
	accessCode: accessCode(),
})

const handler = apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		const { email, password, displayName } = create(req.body, Body)

		const { ref } = await monitorReturnAsync(() => (
			serverClient().query<FaunaUser>(
				q.Create(q.Collection('users'), {
					credentials: { password },
					data: { email, role: 'user', twoFactorSecret: null, displayName },
				}),
			).then(async ({ ref }) => serverClient().query<FaunaUser>(
				q.Update(ref, {
					data: {
						owner: ref,
					},
				}),
			)).catch((error) => {
				if (error instanceof errors.BadRequest) throw ApiError.fromCodeWithError(400, new Error('Email is already in use'))
				else throw error
			})
		), 'faunadb - Create().then(Update())')

		const loginRes = await monitorReturnAsync(() => (
			serverClient().query<{ secret: string }>(
				q.Login(ref, {
					password,
				}),
			)
		), 'faunadb - Login()')

		const userId = monitorReturn(
			() => ref.toString().split(',')[1].replace(/[") ]/gi, ''),
			'userId',
		)

		setUser({ id: userId, username: displayName, email })

		const accessToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId })
		const refreshToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId }, { type: TokenType.Refresh })
		setRefreshCookie(res, refreshToken)

		res.status(200).json({ accessToken })
	})

export default withSentry(handler)
