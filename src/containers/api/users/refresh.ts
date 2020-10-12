import { NextApiRequest, NextApiResponse } from 'next'

import { TokenTypes } from 'types/Token'

import type { Options } from '../types'

import { throwError } from '../errors/ApiError'
import { authenticate, setRefreshCookie } from '../middleware'
import { getJwtToken } from '../getJwtToken'

export const refresh = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { transaction } = options

	switch (method) {
		case 'GET': {
			const { secret, sub, displayName, role, userId } = authenticate(req, res, { type: TokenTypes.Refresh, transaction })

			const [accessToken, newRefreshToken] = await Promise.all([
				getJwtToken(secret, { sub, displayName, role, userId }, { transaction }),
				getJwtToken(secret, { sub, displayName, role, userId }, {
					type: TokenTypes.Refresh,
					transaction,
				}),
			])

			setRefreshCookie(res, newRefreshToken, transaction)
			transaction.setData('user', userId)
			return res.status(200).json({ accessToken })
		}

		default: throwError(405, res)
	}
}
