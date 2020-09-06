import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { authenticator } from 'otplib'

import { TokenTypes } from 'types/Token'

import { ApiError } from '../errors/ApiError'
import { authenticate, setRefreshCookie } from '../middleware'
import { faunaClient } from '../faunaClient'
import { getJwtToken } from '../getJwtToken'

interface Request extends NextApiRequest {
	body: {
		otp: string,
		secret: string,
	}
}

export const twoFactorAuthentication = async (req: Request, res: NextApiResponse, userId: string) => {
	const { method } = req

	switch (method) {
		case 'GET': {
			authenticate(req, res)
			const twoFactorSecret = authenticator.generateSecret()

			res.status(200).json({ twoFactorSecret })
			break
		}

		case 'PATCH': {
			const { body: { secret, otp } } = req
			const { secret: tokenSecret } = authenticate(req, res)

			if (!secret || !otp) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			if (!authenticator.verify({ token: otp, secret })) {
				const error = ApiError.fromCode(401)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			await faunaClient(tokenSecret).query(
				q.Update(q.Ref(q.Collection('users'), userId), {
					data: { twoFactorSecret: secret },
				}),
			)

			res.status(200).json({ message: '2FA has been activated' })
			break
		}

		case 'DELETE': {
			const token = authenticate(req, res)

			await faunaClient(token.secret).query(
				q.Update(q.Ref(q.Collection('users'), userId), {
					data: { twoFactorSecret: null },
				}),
			)

			res.status(200).json({ message: '2FA has been removed' })
			break
		}

		case 'POST': {
			const { body: { otp } } = req
			const { secret, sub, displayName, role, userId } = authenticate(req, res, { type: TokenTypes.Intermediate })

			if (!otp) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const user: { data: Record<string, any> } = await faunaClient(secret).query(
				q.Get(q.Identity()),
			)

			if (!authenticator.verify({ token: otp, secret: user.data.twoFactorSecret })) {
				const error = ApiError.fromCode(401)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const accessToken = getJwtToken(secret, { sub, displayName, role, userId })
			const refreshToken = getJwtToken(secret, { sub, displayName, role, userId }, TokenTypes.Refresh)

			setRefreshCookie(res, refreshToken)

			res.status(200).json({ accessToken })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
