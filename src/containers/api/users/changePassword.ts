import { NextApiRequest, NextApiResponse } from 'next'
import { errors, query as q } from 'faunadb'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'

interface Request extends NextApiRequest {
	body: {
		newPassword: string,
	}
}

export const changePassword = async (req: Request, res: NextApiResponse, userId: string) => {
	const { method, body: { newPassword } } = req
	const token = authenticate(req, res)

	switch (method) {
		case 'POST': {
			if (!newPassword) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			await faunaClient(token.secret).query(
				q.Update(q.Ref(q.Collection('users', userId)), { credentials: { password: newPassword } }),
			)
				.catch((error: unknown) => {
					if (error instanceof errors.Unauthorized) {
						const apiError = ApiError.fromCode(401)
						res.status(apiError.statusCode).json({ error: 'Unauthorized' })
						throw apiError
					}
				})
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
