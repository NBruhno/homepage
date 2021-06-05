import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, FaunaUser } from 'types'

import { query as q, errors } from 'faunadb'
import { TokenType } from 'types'

import { createAndAttachError } from 'api/errors'
import { setRefreshCookie } from 'api/middleware'
import { serverClient, getJwtToken, monitorReturn, monitorReturnAsync } from 'api/utils'

interface Request extends NextApiRequest {
	body: {
		email: string,
		password: string,
	}
}

export const login = async (req: Request, res: NextApiResponse, options: ApiOptions) => {
	const { method, body: { email, password } } = req
	const { transaction } = options

	switch (method) {
		case 'POST': {
			if (!email || !password) throw createAndAttachError(400, res)

			const { data: { displayName, role, twoFactorSecret }, secret, ref } = await monitorReturnAsync(
				() => serverClient(transaction).query<FaunaUser>(q.Merge(
					q.Login(q.Match(q.Index('usersByEmail'), email), { password }),
					q.Get(q.Match(q.Index('usersByEmail'), email)),
				)).catch((error) => {
					if (error instanceof errors.BadRequest) throw createAndAttachError(401, res, new Error('Invalid email and/or password'))
					throw error
				}), 'fanaudb - Merge(Login(), Get())', transaction,
			)

			const userId = monitorReturn(
				() => ref.toString().split(',')[1].replace(/[") ]/gi, ''),
				'userId', transaction,
			)

			if (twoFactorSecret) {
				const intermediateToken = getJwtToken(secret,
					{ sub: email, displayName, role, userId },
					{ type: TokenType.Intermediate, transaction })

				return res.status(200).json({ intermediateToken })
			} else {
				const accessToken = getJwtToken(secret, { sub: email, displayName, role, userId }, { transaction })
				const refreshToken = getJwtToken(secret, { sub: email, displayName, role, userId }, {
					type: TokenType.Refresh,
					transaction,
				})
				setRefreshCookie(res, refreshToken, transaction)

				return res.status(200).json({ accessToken })
			}
		}

		default: throw createAndAttachError(405, res)
	}
}
