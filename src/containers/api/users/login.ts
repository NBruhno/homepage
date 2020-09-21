import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { User } from 'types/User'
import { TokenTypes } from 'types/Token'
import type { Options } from '../types'

import { ApiError } from '../errors/ApiError'
import { getJwtToken } from '../getJwtToken'
import { serverClient } from '../faunaClient'
import { setRefreshCookie } from '../middleware'
import { monitorReturn, monitorReturnAsync } from '../performanceCheck'

interface Request extends NextApiRequest {
	body: {
		email: string,
		password: string,
	}
}

export const login = async (req: Request, res: NextApiResponse, options: Options) => {
	const { method, body: { email, password } } = req
	const { transaction } = options

	switch (method) {
		case 'POST': {
			if (!email || !password) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const { data: { displayName, role, twoFactorSecret }, secret, ref } = await monitorReturnAsync(
				() => serverClient.query<User>(q.Merge(
					q.Login(q.Match(q.Index('usersByEmail'), email), { password }),
					q.Get(q.Match(q.Index('usersByEmail'), email)),
				)).catch((error) => {
					if (error instanceof errors.BadRequest) {
						const apiError = ApiError.fromCode(401)
						res.status(apiError.statusCode).json({ error: 'Invalid email and/or password' })
						throw apiError
					} else throw error
				}), 'fanaudb - Merge(Login(), Get())', transaction,
			)

			const userId = monitorReturn(
				() => ref.toString().split(',')[1].replace(/[") ]/gi, ''),
				'userId', transaction,
			)

			if (twoFactorSecret) {
				const intermediateToken = getJwtToken(secret,
					{ sub: email, displayName, role, userId },
					{ type: TokenTypes.Intermediate, transaction })

				return res.status(200).json({ intermediateToken })
			} else {
				const accessToken = getJwtToken(secret, { sub: email, displayName, role, userId }, { transaction })
				const refreshToken = getJwtToken(secret, { sub: email, displayName, role, userId }, {
					type: TokenTypes.Refresh,
					transaction,
				})
				setRefreshCookie(res, refreshToken, transaction)

				return res.status(200).json({ accessToken })
			}
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
