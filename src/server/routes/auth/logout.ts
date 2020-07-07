import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import { authenticateAccessToken, removeRefreshCookie } from 'server/middleware'
import { faunaClient } from 'server/faunaClient'

export const logout = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'POST': {
			try {
				const token = await authenticateAccessToken(req, res)
				if (!token.secret) {
					res.status(200).end()
					break
				}

				await faunaClient(token.secret).query(query.Logout(false))

				removeRefreshCookie(res)

				res.setHeader('Content-Type', 'text/plain')
				res.status(200).end()
			} catch (error) {
				res.status(500).json(error)
				throw new Error(error)
			}
			break
		}

		default: res.status(405).end()
	}
}
