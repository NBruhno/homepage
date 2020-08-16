import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { User } from 'types/User'
import { TokenTypes } from 'types/Token'

import { ApiError } from '../errors/ApiError'
import { getJwtToken } from '../getJwtToken'
import { serverClient } from '../faunaClient'
import { setRefreshCookie } from '../middleware'

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email, password, displayName } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password || !displayName) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const user = await serverClient.query<User>(
				q.Create(q.Collection('users'), {
					credentials: { password },
					data: { email, user: true, twoFactorSecret: null, displayName },
				}),
			).catch((error) => {
				if (error instanceof errors.BadRequest) {
					const apiError = ApiError.fromCode(400)
					res.status(apiError.statusCode).json({ error: 'Email is already in use' })
					return null
				} else throw error
			})
			if (!user) break

			const loginRes: { secret: string } = await serverClient.query(
				q.Login(user.ref, {
					password,
				}),
			)

			const accessToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user' })
			const refreshToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user' }, TokenTypes.Refresh)

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
