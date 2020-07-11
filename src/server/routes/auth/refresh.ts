import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

import { authenticateRefreshToken, setRefreshCookie } from 'server/middleware'
import { generateAccessToken, generateRefreshToken } from 'server/generateTokens'
import { ApiError } from 'server/errors/ApiError'

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

			const token = await authenticateRefreshToken(req, res)

			const accessToken = generateAccessToken(token.secret, { email: token.email, sub: token.id })
			const newRefreshToken = generateRefreshToken(token.secret, { email: token.email, sub: token.id })

			setRefreshCookie(res, newRefreshToken)

			res.status(200).send({ accessToken })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
