import { NextApiRequest, NextApiResponse } from 'next'
import { JWT, errors } from 'jose'

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
		if (error instanceof errors.JOSEError) {
			switch (error.code) {
				case 'ERR_JWT_EXPIRED': {
					res.status(401).json({ error: 'Token has expired' })
					break
				}
				case 'ERR_JWT_MALFORMED': {
					res.status(401).json({ error: 'I\'m sorry Dave, I\'m afraid I can\'t do that' })
					break
				}
				case 'ERR_JWT_CLAIM_INVALID':
				default: res.status(401).json({ error: 'Token is invalid' })
			}
		} else {
			res.status(500).end()
		}
		throw new Error(error)
	}
}
