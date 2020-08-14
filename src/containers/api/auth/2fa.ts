import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { authenticator } from 'otplib'

import { ApiError } from '../errors/ApiError'
import { authenticateAccessToken, authenticateIntermediateToken, setRefreshCookie } from '../middleware'
import { faunaClient } from '../faunaClient'
import { generateAccessToken, generateRefreshToken } from '../generateTokens'

export const twoFactorAuthentication = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { secret, otp } } = req

	switch (method) {
		case 'GET': {
			await authenticateAccessToken(req, res)
			const twoFactorSecret = authenticator.generateSecret()

			res.status(200).json({ twoFactorSecret })
			break
		}

		case 'PATCH': {
			const token = await authenticateAccessToken(req, res)

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

			await faunaClient(token.secret).query(
				q.Update(q.Select(['ref'], q.Get(q.Identity())), {
					data: { twoFactorSecret: secret },
				}),
			)

			res.status(200).json({ message: '2FA has been activated' })
			break
		}

		case 'DELETE': {
			const token = await authenticateAccessToken(req, res)

			await faunaClient(token.secret).query(
				q.Update(q.Select(['ref'], q.Get(q.Identity())), {
					data: { twoFactorSecret: null },
				}),
			)

			res.status(200).json({ message: '2FA has been removed' })
			break
		}

		case 'POST': {
			const token = await authenticateIntermediateToken(req, res)

			if (!otp) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const user: { data: Record<string, any> } = await faunaClient(token.secret).query(
				q.Get(q.Identity()),
			)

			if (!authenticator.verify({ token: otp, secret: user.data.twoFactorSecret })) {
				const error = ApiError.fromCode(401)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const accessToken = generateAccessToken(token.secret, { sub: token.sub, displayName: token.displayName, role: token.role })
			const refreshToken = generateRefreshToken(token.secret, { sub: token.sub, displayName: token.displayName, role: token.role })

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
