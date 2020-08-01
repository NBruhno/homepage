import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import type { User } from 'types/User'

import { generateAccessToken, generateRefreshToken, generateIntermediateToken } from 'server/generateTokens'
import { setRefreshCookie } from 'server/middleware'
import { ApiError } from 'server/errors/ApiError'
import { serverClient } from 'server/faunaClient'

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email, password } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const { data, secret } = await serverClient.query<User>(q.Merge(
				q.Login(q.Match(q.Index('users_by_email'), email), { password }),
				q.Get(q.Match(q.Index('users_by_email'), email)),
			)).catch((error) => {
				if (error.requestResult.statusCode === 400) {
					res.status(401).json({ error: 'Password is incorrect' })
				}
				throw error
			})

			const getRole = () => {
				switch (true) {
					case data.owner: return 'owner'
					case data.user: return 'user'
					default: return 'unknown'
				}
			}

			if (data?.twoFactorSecret) {
				const intermediateToken = generateIntermediateToken(secret, { sub: email, displayName: data.displayName, role: getRole() })

				res.status(200).json({ intermediateToken })
				break
			} else {
				const accessToken = generateAccessToken(secret, { sub: email, displayName: data.displayName, role: getRole() })
				const refreshToken = generateRefreshToken(secret, { sub: email, displayName: data.displayName, role: getRole() })

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
