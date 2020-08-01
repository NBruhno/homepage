import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { authenticator } from 'otplib'

import { authenticateAccessToken, authenticateIntermediateToken, setRefreshCookie } from 'server/middleware'
import { generateAccessToken, generateRefreshToken } from 'server/generateTokens'
import { ApiError } from 'server/errors/ApiError'
import { faunaClient } from 'server/faunaClient'

export const twoFactorAuthentication = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	switch (method) {
		case 'GET': {
			await authenticateAccessToken(req, res)
			const twoFactorSecret = authenticator.generateSecret()

			res.status(200).json({ twoFactorSecret })
			break
		}

		case 'PATCH': {
			const { secret, otp } = body
			const token = await authenticateAccessToken(req, res)
			if (!token) break

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

			res.setHeader('Content-Type', 'text/plain')
			res.status(200).end()
			break
		}

		case 'POST': {
			const { otp } = body
			const token = await authenticateIntermediateToken(req, res)
			if (!token) break

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

			res.setHeader('Content-Type', 'text/plain')
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
