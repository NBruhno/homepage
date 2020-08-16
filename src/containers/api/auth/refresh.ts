import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

import { TokenTypes } from 'types/Token'

import { ApiError } from '../errors/ApiError'
import { authenticate, setRefreshCookie } from '../middleware'
import { getJwtToken } from '../getJwtToken'

export const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, cookies } = req
	const refreshToken = config.environment !== 'development' ? cookies['__Host-refreshToken'] : cookies['refreshToken']

	switch (method) {
		case 'GET': {
			if (!refreshToken) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const token = authenticate(req, res, { type: TokenTypes.Refresh })

			const accessToken = getJwtToken(token.secret, { sub: token.sub, displayName: token.displayName })
			const newRefreshToken = getJwtToken(token.secret, { sub: token.sub, displayName: token.displayName }, TokenTypes.Refresh)

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
