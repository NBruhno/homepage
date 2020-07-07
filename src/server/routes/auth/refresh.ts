import { NextApiRequest, NextApiResponse } from 'next'

import { authenticateRefreshToken, setRefreshCookie } from 'server/middleware'
import { generateAccessToken, generateRefreshToken } from 'server/generateTokens'

export const refresh = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, cookies } = req

	switch (method) {
		case 'GET': {
			try {
				if (!cookies.refreshToken) {
					res.status(400).end('Invalid token.')
					break
				}

				const token: Record<string, any> = await authenticateRefreshToken(req, res, cookies.refreshToken)

				const accessToken = generateAccessToken(token.secret, { email: token.email, sub: token.id })
				const refreshToken = generateRefreshToken(token.secret, { email: token.email, sub: token.id })

				setRefreshCookie(res, refreshToken)

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
