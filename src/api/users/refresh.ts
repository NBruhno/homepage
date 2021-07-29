import type { NextApiRequest, NextApiResponse } from 'next'
import { TokenType } from 'types'

import { getActiveTransaction } from '@sentry/tracing'

import { createAndAttachError } from 'api/errors'
import { authenticate, setRefreshCookie } from 'api/middleware'
import { getJwtToken } from 'api/utils'

export const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'GET': {
			const { secret, sub, displayName, role, userId } = authenticate(req, res, { type: TokenType.Refresh })

			const [accessToken, newRefreshToken] = await Promise.all([
				getJwtToken(secret, { sub, displayName, role, userId }),
				getJwtToken(secret, { sub, displayName, role, userId }, { type: TokenType.Refresh }),
			])

			setRefreshCookie(res, newRefreshToken)
			const transaction = getActiveTransaction()
			if (transaction) transaction.setData('user', userId)
			return res.status(200).json({ accessToken })
		}

		default: throw createAndAttachError(405, res)
	}
}
