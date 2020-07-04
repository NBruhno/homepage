import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'jose'

import { config } from 'config.server'
import { Token } from 'types/Token'
import { decrypt } from 'server/cipher'

export const authenticateRefreshToken = async (req: NextApiRequest, res: NextApiResponse, token?: string) => {
	const { cookies: { refreshToken } } = req

	try {
		let decodedToken = <Token>JWT.verify(token || refreshToken.split('Bearer ')[1], config.auth.refresh.publicKey, {
			algorithms: ['RS256'],
			audience: ['https://bruhno.com', 'https://bruhno.dev'],
			issuer: 'https://bruhno.dev',
		})

		decodedToken = { ...decodedToken, secret: decrypt(decodedToken.secret) }

		return decodedToken
	} catch (error) {
		console.error(error)
		res.status(500).json(error)
	}
}
