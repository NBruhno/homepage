import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { User } from 'types/User'
import { TokenTypes } from 'types/Token'

import { ApiError } from '../errors/ApiError'
import { getJwtToken } from '../getJwtToken'
import { serverClient } from '../faunaClient'
import { setRefreshCookie } from '../middleware'

interface Request extends NextApiRequest {
	body: {
		email: string,
		password: string,
	}
}

export const login = async (req: Request, res: NextApiResponse) => {
	const { method, body: { email, password } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const { data: { displayName, role, twoFactorSecret }, secret, ref } = await serverClient.query<User>(q.Merge(
				q.Login(q.Match(q.Index('usersByEmail'), email), { password }),
				q.Get(q.Match(q.Index('usersByEmail'), email)),
			)).catch((error) => {
				if (error instanceof errors.BadRequest) {
					const apiError = ApiError.fromCode(401)
					res.status(apiError.statusCode).json({ error: 'Invalid email and/or password' })
					throw apiError
				} else throw error
			})

			const userId = ref.toString().split(',')[1].replace(/[") ]/gi, '')

			if (twoFactorSecret) {
				const intermediateToken = getJwtToken(secret, { sub: email, displayName, role, userId }, TokenTypes.Intermediate)

				res.status(200).json({ intermediateToken })
				break
			} else {
				const accessToken = getJwtToken(secret, { sub: email, displayName, role, userId })
				const refreshToken = getJwtToken(secret, { sub: email, displayName, role, userId }, TokenTypes.Refresh)

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
