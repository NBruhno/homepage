import { NextApiRequest, NextApiResponse } from 'next'
import { JWT } from 'jose'

import { config } from 'config.server'
import { Token } from 'types/Token'
import { decrypt } from 'server/cipher'

export const authenticateAccessToken = async (req: NextApiRequest, res: NextApiResponse, token?: string) => {
	const { headers: { authorization } } = req

	if (!authorization) {
		res.status(401).end()
		return
	}

	try {
		let decodedToken = <Token>JWT.verify(token || authorization?.split('Bearer ')[1], config.auth.publicKey, {
			algorithms: ['RS256'],
			audience: ['https://bruhno.com', 'https://bruhno.dev'],
			issuer: 'https://bruhno.dev',
		})

		decodedToken = { ...decodedToken, secret: decrypt(decodedToken.secret) }

		return decodedToken
	} catch (error) {
		if (error) {
			res.status(401).json(error)
		} else {
			res.status(401).end()
		}
		throw new Error(error)
	}
}
