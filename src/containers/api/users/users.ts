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
		displayName: string,
	}
}

export const users = async (req: Request, res: NextApiResponse) => {
	const { method, body: { email, password, displayName } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password || !displayName) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const { ref } = await serverClient.query<User>(
				q.Create(q.Collection('users'), {
					credentials: { password },
					data: { email, role: 'user', twoFactorSecret: null, displayName },
				}),
			).then(async ({ ref }) => serverClient.query<User>(
				q.Update(ref, {
					data: {
						owner: ref,
					},
				}),
			)).catch((error) => {
				if (error instanceof errors.BadRequest) {
					const apiError = ApiError.fromCode(400)
					res.status(apiError.statusCode).json({ error: 'Email is already in use' })
					throw apiError
				}
				throw error
			})

			const loginRes: { secret: string } = await serverClient.query(
				q.Login(ref, {
					password,
				}),
			)

			const userId = ref.toString().split(',')[1].replace(/[") ]/gi, '')

			const accessToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId })
			const refreshToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId }, TokenTypes.Refresh)

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
