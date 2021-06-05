import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'

import { TokenType } from 'types'

import { createAndAttachError } from 'api/errors'
import { authenticate, setRefreshCookie } from 'api/middleware'
import { getJwtToken } from 'api/utils'

export const refresh = async (req: NextApiRequest, res: NextApiResponse, options: ApiOptions) => {
	const { method } = req
	const { transaction } = options

	switch (method) {
		case 'GET': {
			const { secret, sub, displayName, role, userId } = authenticate(req, res, { type: TokenType.Refresh, transaction })

			const [accessToken, newRefreshToken] = await Promise.all([
				getJwtToken(secret, { sub, displayName, role, userId }, { transaction }),
				getJwtToken(secret, { sub, displayName, role, userId }, {
					type: TokenType.Refresh,
					transaction,
				}),
			])

			setRefreshCookie(res, newRefreshToken, transaction)
			transaction.setData('user', userId)
			return res.status(200).json({ accessToken })
		}

		default: throw createAndAttachError(405, res)
	}
}
