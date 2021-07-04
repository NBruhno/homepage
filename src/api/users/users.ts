import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, FaunaUser } from 'types'
import { TokenType } from 'types'

import { query as q, errors } from 'faunadb'

import { monitorReturn, monitorReturnAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { setRefreshCookie } from 'api/middleware'
import { serverClient, getJwtToken } from 'api/utils'

interface Request extends NextApiRequest {
	body: {
		email: string,
		password: string,
		displayName: string,
	}
}

export const users = async (req: Request, res: NextApiResponse, options: ApiOptions) => {
	const { method, body: { email, password, displayName } } = req
	const { transaction } = options

	switch (method) {
		case 'POST': {
			if (!email || !password || !displayName) throw createAndAttachError(400, res)

			const { ref } = await monitorReturnAsync(() => (
				serverClient(transaction).query<FaunaUser>(
					q.Create(q.Collection('users'), {
						credentials: { password },
						data: { email, role: 'user', twoFactorSecret: null, displayName },
					}),
				).then(async ({ ref }) => serverClient(transaction).query<FaunaUser>(
					q.Update(ref, {
						data: {
							owner: ref,
						},
					}),
				)).catch((error) => {
					if (error instanceof errors.BadRequest) throw createAndAttachError(400, res, new Error('Email is already in use'))
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
				type: TokenType.Refresh,
				transaction,
			})
			setRefreshCookie(res, refreshToken, transaction)

			return res.status(200).json({ accessToken })
		}

		default: throw createAndAttachError(405, res)
	}
}
