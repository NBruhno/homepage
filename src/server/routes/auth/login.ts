import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import { generateAccessToken, generateRefreshToken } from 'server/generateTokens'
import { setRefreshCookie } from 'server/middleware'
import { serverClient, faunaClient } from 'server/faunaClient'

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email, password } } = req

	switch (method) {
		case 'POST': {
			try {
				if (!email || !password) {
					res.status(400).json('Please provide both an email and a password')
					break
				}

				const loginRes: { secret: string } = await serverClient.query(
					query.Login(query.Match(query.Index('users_by_email'), email), {
						password,
					}),
				)

				if (!loginRes.secret) {
					res.status(401).end('Failed to login with the provided email and/or password')
					break
				}

				const { id }: { id: string } = await faunaClient(loginRes.secret).query(query.Identity())

				const accessToken = generateAccessToken(loginRes.secret, { email, sub: id })
				const refreshToken = generateRefreshToken(loginRes.secret, { email, sub: id })

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
