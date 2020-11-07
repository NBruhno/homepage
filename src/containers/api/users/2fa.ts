import { query as q } from 'faunadb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticator } from 'otplib'

import { TokenTypes } from 'types/Token'

import { throwError } from '../errors/ApiError'
import { faunaClient } from '../faunaClient'
import { getJwtToken } from '../getJwtToken'
import { authenticate, setRefreshCookie } from '../middleware'
import { monitor, monitorAsync, monitorReturn, monitorReturnAsync } from '../performanceCheck'
import type { Options as DefaultOptions } from '../types'

interface Request extends NextApiRequest {
	body: {
		otp: string,
		secret: string,
	}
}

type Options = {
	userId: string,
} & DefaultOptions

export const twoFactorAuthentication = async (req: Request, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { userId, transaction } = options
	transaction.setName(`${method} - api/users/{userId}/2fa`)

	switch (method) {
		case 'GET': {
			authenticate(req, res, { transaction })
			const twoFactorSecret = monitorReturn(() => authenticator.generateSecret(), 'generateSecret()', transaction)

			return res.status(200).json({ twoFactorSecret })
		}

		case 'PATCH': {
			const { body: { secret, otp } } = req
			const { secret: tokenSecret } = authenticate(req, res, { transaction })

			if (!secret || !otp) throwError(400, res)

			monitor(() => {
				if (!authenticator.verify({ token: otp, secret })) throwError(401, res)
			}, 'verify()', transaction)

			await monitorAsync(() => faunaClient(tokenSecret).query(
				q.Update(q.Ref(q.Collection('users'), userId), {
					data: { twoFactorSecret: secret },
				}),
			), 'faunadb - Update()', transaction)

			return res.status(200).json({ message: '2FA has been activated' })
		}

		case 'DELETE': {
			const token = authenticate(req, res, { transaction })

			await monitorAsync(() => faunaClient(token.secret).query(
				q.Update(q.Ref(q.Collection('users'), userId), {
					data: { twoFactorSecret: null },
				}),
			), 'faunadb - Update()', transaction)

			return res.status(200).json({ message: '2FA has been removed' })
		}

		case 'POST': {
			const { body: { otp } } = req
			const { secret, sub, displayName, role, userId } = authenticate(req, res, { type: TokenTypes.Intermediate, transaction })

			if (!otp) throwError(400, res)

			const user = await monitorReturnAsync(() => faunaClient(secret).query<{ data: Record<string, any> }>(
				q.Get(q.Identity()),
			), 'faunadb - Get()', transaction)

			monitor(() => {
				if (!authenticator.verify({ token: otp, secret: user.data.twoFactorSecret })) throwError(401, res)
			}, 'verify()', transaction)

			const accessToken = getJwtToken(secret, { sub, displayName, role, userId }, { transaction })
			const refreshToken = getJwtToken(secret, { sub, displayName, role, userId }, { type: TokenTypes.Refresh, transaction })

			setRefreshCookie(res, refreshToken, transaction)

			return res.status(200).json({ accessToken })
		}

		default: throwError(405, res)
	}
}
