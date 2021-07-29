import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'
import { TokenType } from 'types'

import { getActiveTransaction } from '@sentry/tracing'
import { query as q } from 'faunadb'
import { authenticator } from 'otplib'

import { monitorReturn, monitor, monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { authenticate, setRefreshCookie } from 'api/middleware'
import { faunaClient, getJwtToken } from 'api/utils'

interface Request extends NextApiRequest {
	body: {
		otp: string,
		secret: string,
	}
}

type Options = {
	userId: string,
} & ApiOptions

export const twoFactorAuthentication = async (req: Request, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { userId } = options
	const transaction = getActiveTransaction()
	if (transaction) transaction.setName(`${method} - api/users/{userId}/2fa`)

	switch (method) {
		case 'GET': {
			authenticate(req, res)
			const twoFactorSecret = monitorReturn(() => authenticator.generateSecret(), 'generateSecret()')

			return res.status(200).json({ twoFactorSecret })
		}

		case 'PATCH': {
			const { body: { secret, otp } } = req
			const { secret: tokenSecret } = authenticate(req, res)

			if (!secret || !otp) throw createAndAttachError(400, res)

			monitor(() => {
				if (!authenticator.verify({ token: otp, secret })) throw createAndAttachError(401, res)
			}, 'verify()')

			await monitorAsync(() => faunaClient(tokenSecret).query(
				q.Update(q.Ref(q.Collection('users'), userId), {
					data: { twoFactorSecret: secret },
				}),
			), 'faunadb - Update()')

			return res.status(200).json({ message: '2FA has been activated' })
		}

		case 'DELETE': {
			const { secret } = authenticate(req, res)

			await monitorAsync(() => faunaClient(secret).query(
				q.Update(q.Ref(q.Collection('users'), userId), {
					data: { twoFactorSecret: null },
				}),
			), 'faunadb - Update()')

			return res.status(200).json({ message: '2FA has been removed' })
		}

		case 'POST': {
			const { body: { otp } } = req
			const { secret, sub, displayName, role, userId } = authenticate(req, res, { type: TokenType.Intermediate })

			if (!otp) throw createAndAttachError(400, res)

			const user = await monitorReturnAsync(() => faunaClient(secret).query<{ data: Record<string, any> }>(
				q.Get(q.CurrentIdentity()),
			), 'faunadb - Get()')

			monitor(() => {
				if (!authenticator.verify({ token: otp, secret: user.data.twoFactorSecret })) throw createAndAttachError(401, res)
			}, 'verify()')

			const accessToken = getJwtToken(secret, { sub, displayName, role, userId })
			const refreshToken = getJwtToken(secret, { sub, displayName, role, userId }, { type: TokenType.Refresh })

			setRefreshCookie(res, refreshToken)

			return res.status(200).json({ accessToken })
		}

		default: throw createAndAttachError(405, res)
	}
}
