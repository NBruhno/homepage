import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import { generateAccessToken, generateRefreshToken, generateIntermediateToken } from 'server/generateTokens'
import { setRefreshCookie } from 'server/middleware'
import { ApiError } from 'server/errors/ApiError'
import { serverClient, faunaClient } from 'server/faunaClient'

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email, password } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const loginRes: { secret: string } = await serverClient.query(
				query.Login(query.Match(query.Index('users_by_email'), email), {
					password,
				}),
			)

			if (!loginRes.secret) {
				const error = ApiError.fromCode(401)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const { id }: { id: string } = await faunaClient(loginRes.secret).query(query.Identity())

			const user: { data: Record<string, any> } = await faunaClient(loginRes.secret).query(
				query.Get(query.Match(query.Index('users_by_email'), email)),
			)

			if (user.data.twoFactorSecret) {
				const intermediateToken = generateIntermediateToken(loginRes.secret, { email, sub: id })

				res.status(200).json({ intermediateToken })
				break
			} else {
				const accessToken = generateAccessToken(loginRes.secret, { email, sub: id })
				const refreshToken = generateRefreshToken(loginRes.secret, { email, sub: id })

				setRefreshCookie(res, refreshToken)

				res.status(200).json({ accessToken })
				break
			}
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
