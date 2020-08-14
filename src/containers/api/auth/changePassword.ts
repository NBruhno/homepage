import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { ApiError } from '../errors/ApiError'
import { authenticateAccessToken } from '../middleware'
import { faunaClient } from '../faunaClient'

export const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { newPassword } } = req
	const token = authenticateAccessToken(req, res)

	switch (method) {
		case 'POST': {
			if (!newPassword) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			await faunaClient(token.secret).query(q.Update(q.Identity(), { credentials: { password: newPassword } }))
			res.status(200).json({ message: 'Your password has been updated' })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
