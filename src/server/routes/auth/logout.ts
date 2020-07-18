import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import { authenticateAccessToken, removeRefreshCookie } from 'server/middleware'
import { ApiError } from 'server/errors/ApiError'
import { faunaClient } from 'server/faunaClient'

export const logout = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'POST': {
			const token = await authenticateAccessToken(req, res)
			if (!token?.secret) {
				res.setHeader('Content-Type', 'text/plain')
				res.status(200).send('')
				removeRefreshCookie(res)
				break
			}

			await faunaClient(token.secret).query(query.Logout(true))

			removeRefreshCookie(res)

			res.setHeader('Content-Type', 'text/plain')
			res.status(200).send('')
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
