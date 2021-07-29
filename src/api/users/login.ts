import type { NextApiRequest, NextApiResponse } from 'next'
import type { FaunaUser } from 'types'
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
	}
}

export const login = async (req: Request, res: NextApiResponse) => {
	const { method, body: { email, password } } = req

	switch (method) {
		case 'POST': {
			if (!email || !password) throw createAndAttachError(400, res)

			const { data: { displayName, role, twoFactorSecret }, secret, ref } = await monitorReturnAsync(
				() => serverClient().query<FaunaUser>(q.Merge(
					q.Login(q.Match(q.Index('usersByEmail'), email), { password }),
					q.Get(q.Match(q.Index('usersByEmail'), email)),
				)).catch((error) => {
					if (error instanceof errors.BadRequest) throw createAndAttachError(401, res, new Error('Invalid email and/or password'))
					throw error
				}), 'fanaudb - Merge(Login(), Get())',
			)

			const userId = monitorReturn(
				() => ref.toString().split(',')[1].replace(/[") ]/gi, ''),
				'userId',
			)

			if (twoFactorSecret) {
				const intermediateToken = getJwtToken(secret,
					{ sub: email, displayName, role, userId },
					{ type: TokenType.Intermediate })

				return res.status(200).json({ intermediateToken })
			} else {
				const accessToken = getJwtToken(secret, { sub: email, displayName, role, userId })
				const refreshToken = getJwtToken(secret, { sub: email, displayName, role, userId }, { type: TokenType.Refresh })
				setRefreshCookie(res, refreshToken)

				return res.status(200).json({ accessToken })
			}
		}

		default: throw createAndAttachError(405, res)
	}
}
