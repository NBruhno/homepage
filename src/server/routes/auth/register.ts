import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import { generateRefreshToken, generateAccessToken } from 'server/generateTokens'
import { setRefreshCookie } from 'server/middleware'
import { serverClient } from 'server/faunaClient'
import { ApiError } from 'server/errors/ApiError'

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email, password } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const user: Record<string, any> = await serverClient.query(
				query.Create(query.Collection('users'), {
					credentials: { password },
					data: { email },
				}),
			)

			if (!user.ref) {
				const error = ApiError.fromCode(401)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const loginRes: { secret: string } = await serverClient.query(
				query.Login(user.ref, {
					password,
				}),
			)

			if (!loginRes.secret) {
				res.status(401).end('Failed to sign up with the provided email and/or password')
				break
			}

			const accessToken = generateAccessToken(loginRes.secret, { sub: user.ref.id, email })
			const refreshToken = generateRefreshToken(loginRes.secret, { sub: user.ref.id, email })

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
