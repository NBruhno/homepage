import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { ApiError } from '../errors/ApiError'
import { authenticate, removeRefreshCookie } from '../middleware'
import { faunaClient } from '../faunaClient'

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	const token = authenticate(req, res)

	switch (method) {
		case 'POST': {
			await faunaClient(token.secret).query(q.Delete(q.Identity()))

			removeRefreshCookie(res)
			res.status(200).json({ message: 'Your user has been deleted' })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
