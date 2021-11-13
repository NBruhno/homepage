import { TokenType } from 'types'

import { withSentry } from '@sentry/nextjs'
import { query as q } from 'faunadb'
import { authenticator } from 'otplib'
import { create, object, string } from 'superstruct'

import { monitorReturn, monitor, monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { authenticate, setRefreshCookie } from 'api/middleware'
import { apiHandler, faunaClient, getJwtToken } from 'api/utils'

const Query = object({
	id: string(),
})

const handler = apiHandler({
	validMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method} api/users/{userId}/2fa`,
})
	.get((req, res) => {
		authenticate(req)
		const twoFactorSecret = monitorReturn(() => authenticator.generateSecret(), 'generateSecret()')

		res.status(200).json({ twoFactorSecret })
	})
	.post(async (req, res) => {
		const { otp } = create(req.body, object({
			otp: string(),
		}))
		const { secret, sub, displayName, role, userId } = authenticate(req, { type: TokenType.Intermediate })

		const user = await monitorReturnAsync(() => faunaClient(secret).query<{ data: Record<string, any> }>(
			q.Get(q.CurrentIdentity()),
		), 'faunadb - Get()')

		monitor(() => {
			if (!authenticator.verify({ token: otp, secret: user.data.twoFactorSecret })) throw ApiError.fromCode(401)
		}, 'verify()')

		const accessToken = getJwtToken(secret, { sub, displayName, role, userId })
		const refreshToken = getJwtToken(secret, { sub, displayName, role, userId }, { type: TokenType.Refresh })

		setRefreshCookie(res, refreshToken)

		res.status(200).json({ accessToken })
	})
	.patch(async (req, res) => {
		const { secret, otp } = create(req.body, object({
			otp: string(),
			secret: string(),
		}))
		const { id } = create(req.query, Query)
		const { secret: faunaSecret } = authenticate(req)

		monitor(() => {
			if (!authenticator.verify({ token: otp, secret })) throw ApiError.fromCode(401)
		}, 'verify()')

		await monitorAsync(() => faunaClient(faunaSecret).query(
			q.Update(q.Ref(q.Collection('users'), id), {
				data: { twoFactorSecret: secret },
			}),
		), 'faunadb - Update()')

		res.status(200).json({ message: '2FA has been activated' })
	})
	.delete(async (req, res) => {
		const { secret } = authenticate(req)
		const { id } = create(req.query, Query)

		await monitorAsync(() => faunaClient(secret).query(
			q.Update(q.Ref(q.Collection('users'), id), {
				data: { twoFactorSecret: null },
			}),
		), 'faunadb - Update()')

		res.status(200).json({ message: '2FA has been removed' })
	})

export default withSentry(handler)
