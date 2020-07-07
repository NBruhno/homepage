import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

import { authenticateRefreshToken, setRefreshCookie } from 'server/middleware'
import { generateAccessToken, generateRefreshToken } from 'server/generateTokens'

export const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, cookies } = req
	const refreshToken = config.environment !== 'development' ? cookies['__Host-refreshToken'] : cookies['refreshToken']

	switch (method) {
		case 'GET': {
			try {
				if (!refreshToken) {
					res.status(400).end('Invalid token.')
					break
				}

				const token: Record<string, any> = await authenticateRefreshToken(req, res, refreshToken)

				const accessToken = generateAccessToken(token.secret, { email: token.email, sub: token.id })
				const newRefreshToken = generateRefreshToken(token.secret, { email: token.email, sub: token.id })

				setRefreshCookie(res, newRefreshToken)

				res.setHeader('Content-Type', 'text/plain')
				res.status(200).send(accessToken)
			} catch (error) {
				res.status(500).json(error)
				throw new Error(error)
			}
			break
		}

		default: res.status(405).end()
	}
}
