import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import { generateRefreshToken, generateAccessToken } from 'server/generateTokens'
import { setRefreshCookie } from 'server/cookies'
import { serverClient } from 'server/faunaClient'

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email, password } } = req

	switch (method) {
		case 'POST': {
			try {
				if (!email || !password) {
					res.status(400).json('Please provide both email and password')
					break
				}

				const user: Record<string, any> = await serverClient.query(
					query.Create(query.Collection('users'), {
						credentials: { password },
						data: { email },
					}),
				)

				if (!user.ref) {
					res.status(401).end('Failed to sign up with the provided email and/or password')
					break
				}

				const loginRes: { secret: string } = await serverClient.query(
					query.Login(user.ref, {
						password,
					}),
				)

				if (!loginRes.secret) {
					res.status(401).end('Failed to sign up with the provided email and/or password')
					break
				}

				const accessToken = generateAccessToken(loginRes.secret, { sub: user.ref.id, email })
				const refreshToken = generateRefreshToken(loginRes.secret, { sub: user.ref.id, email })

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
