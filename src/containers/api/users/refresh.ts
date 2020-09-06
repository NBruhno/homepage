import { NextApiRequest, NextApiResponse } from 'next'

import { TokenTypes } from 'types/Token'

import { ApiError } from '../errors/ApiError'
import { authenticate, setRefreshCookie } from '../middleware'
import { getJwtToken } from '../getJwtToken'

export const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'GET': {
			const { secret, sub, displayName, role, userId } = authenticate(req, res, { type: TokenTypes.Refresh })

			const accessToken = getJwtToken(secret, { sub, displayName, role, userId })
			const newRefreshToken = getJwtToken(secret, { sub, displayName, role, userId }, TokenTypes.Refresh)

			setRefreshCookie(res, newRefreshToken)
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
