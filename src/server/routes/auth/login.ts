import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { User } from 'types/User'

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

			let user = null as User

			try {
				user = await serverClient.query(q.Merge(
					q.Login(q.Match(q.Index('users_by_email'), email), { password }),
					q.Get(q.Match(q.Index('users_by_email'), email)),
				))
			} catch (error) {
				if (error.requestResult.statusCode === 400) {
					res.status(401).json({ error: 'Password is incorrect' })
				}
				throw error
			}

			if (user.data?.twoFactorSecret) {
				const intermediateToken = generateIntermediateToken(user.secret, { sub: email, displayName: user.data.displayName })

				res.status(200).json({ intermediateToken })
				break
			} else {
				const accessToken = generateAccessToken(user.secret, { sub: email, displayName: user.data.displayName })
				const refreshToken = generateRefreshToken(user.secret, { sub: email, displayName: user.data.displayName })

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
