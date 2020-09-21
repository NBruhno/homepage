import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { User } from 'types/User'
import { TokenTypes } from 'types/Token'
import type { Options } from '../types'

import { ApiError } from '../errors/ApiError'
import { getJwtToken } from '../getJwtToken'
import { serverClient } from '../faunaClient'
import { setRefreshCookie } from '../middleware'
import { monitorReturnAsync, monitorReturn } from '../performanceCheck'

interface Request extends NextApiRequest {
	body: {
		email: string,
		password: string,
		displayName: string,
	}
}

export const users = async (req: Request, res: NextApiResponse, options: Options) => {
	const { method, body: { email, password, displayName } } = req
	const { transaction } = options

	switch (method) {
		case 'POST': {
			if (!email || !password || !displayName) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const { ref } = await monitorReturnAsync(() => (
				serverClient.query<User>(
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
			), 'faunadb - Create().then(Update())', transaction)

			const loginRes = await monitorReturnAsync(() => (
				serverClient.query<{ secret: string }>(
					q.Login(ref, {
						password,
					}),
				)
			), 'faunadb - Login()', transaction)

			const userId = monitorReturn(
				() => ref.toString().split(',')[1].replace(/[") ]/gi, ''),
				'userId', transaction,
			)

			const accessToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId }, { transaction })
			const refreshToken = getJwtToken(loginRes.secret, { sub: email, displayName, role: 'user', userId }, {
				type: TokenTypes.Refresh,
				transaction,
			})
			setRefreshCookie(res, refreshToken, transaction)

			return res.status(200).json({ accessToken })
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
