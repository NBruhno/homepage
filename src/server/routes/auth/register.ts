import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import type { User } from 'types/User'

import { generateRefreshToken, generateAccessToken } from 'server/generateTokens'
import { setRefreshCookie } from 'server/middleware'
import { serverClient } from 'server/faunaClient'
import { ApiError } from 'server/errors/ApiError'

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email, password, displayName } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password || !displayName) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const user: User = await serverClient.query(
				q.Create(q.Collection('users'), {
					credentials: { password },
					data: { email, user: true, twoFactorSecret: null, displayName },
				}),
			)

			if (!user.ref) {
				const error = ApiError.fromCode(401)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const loginRes: { secret: string } = await serverClient.query(
				q.Login(user.ref, {
					password,
				}),
			)

			if (!loginRes.secret) {
				res.status(401).end('Failed to sign up with the provided email and/or password')
				break
			}

			const accessToken = generateAccessToken(loginRes.secret, { sub: email, displayName })
			const refreshToken = generateRefreshToken(loginRes.secret, { sub: email, displayName })

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
