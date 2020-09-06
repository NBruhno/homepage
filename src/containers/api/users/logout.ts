import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import { ApiError } from '../errors/ApiError'
import { authenticate, removeRefreshCookie } from '../middleware'
import { faunaClient } from '../faunaClient'

export const logout = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'POST': {
			const token = authenticate(req, res)
			await faunaClient(token.secret).query(query.Logout(false)).catch((error) => {
				removeRefreshCookie(res)
				res.status(200).json({ message: 'You have been logged out successfully' })
				throw error
			})

			removeRefreshCookie(res)
			res.status(200).json({ message: 'You have been logged out successfully' })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
