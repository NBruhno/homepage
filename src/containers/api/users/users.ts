import type { Options } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import { TokenTypes } from 'types/Token'
import type { User } from 'types/User'

import { query as q, errors } from 'faunadb'

import { throwError } from '../errors/ApiError'
import { serverClient } from '../faunaClient'
import { getJwtToken } from '../getJwtToken'
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
			if (!email || !password || !displayName) throwError(400, res)

			const { ref } = await monitorReturnAsync(() => (
				serverClient(transaction).query<User>(
					q.Create(q.Collection('users'), {
						credentials: { password },
						data: { email, role: 'user', twoFactorSecret: null, displayName },
					}),
				).then(async ({ ref }) => serverClient(transaction).query<User>(
					q.Update(ref, {
						data: {
							owner: ref,
						},
					}),
				)).catch((error) => {
					if (error instanceof errors.BadRequest) throwError(400, res, 'Email is already in use')
					throw error
				})
			), 'faunadb - Create().then(Update())', transaction)

			const loginRes = await monitorReturnAsync(() => (
				serverClient(transaction).query<{ secret: string }>(
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

		default: throwError(405, res)
	}
}
