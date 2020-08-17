import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { User } from 'types/User'
import { TokenTypes } from 'types/Token'

import { ApiError } from '../errors/ApiError'
import { getJwtToken } from '../getJwtToken'
import { serverClient } from '../faunaClient'
import { setRefreshCookie } from '../middleware'

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
				q.Login(q.Match(q.Index('usersByEmail'), email), { password }),
				q.Get(q.Match(q.Index('usersByEmail'), email)),
			)).catch((error) => {
				if (error instanceof errors.BadRequest) {
					const apiError = ApiError.fromCode(401)
					res.status(apiError.statusCode).json({ error: 'Invalid email and/or password' })
					throw apiError
				} else throw error
			})

			if (data?.twoFactorSecret) {
				const intermediateToken = getJwtToken(secret, { sub: email, displayName: data.displayName, role: data.role }, TokenTypes.Intermediate)

				res.status(200).json({ intermediateToken })
				break
			} else {
				const accessToken = getJwtToken(secret, { sub: email, displayName: data.displayName, role: data.role })
				const refreshToken = getJwtToken(secret, { sub: email, displayName: data.displayName, role: data.role }, TokenTypes.Refresh)

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
