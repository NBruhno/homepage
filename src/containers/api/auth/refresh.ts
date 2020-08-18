import { NextApiRequest, NextApiResponse } from 'next'

import { TokenTypes } from 'types/Token'

import { ApiError } from '../errors/ApiError'
import { authenticate, setRefreshCookie } from '../middleware'
import { getJwtToken } from '../getJwtToken'

export const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'GET': {
			const token = authenticate(req, res, { type: TokenTypes.Refresh })

			const accessToken = getJwtToken(token.secret, { sub: token.sub, displayName: token.displayName, role: token.role })
			const newRefreshToken = getJwtToken(token.secret, { sub: token.sub, displayName: token.displayName, role: token.role }, TokenTypes.Refresh)

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
