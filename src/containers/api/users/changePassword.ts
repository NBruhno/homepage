import { NextApiRequest, NextApiResponse } from 'next'
import { errors, query as q } from 'faunadb'

import type { Options as DefaultOptions } from '../types'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'
import { monitorAsync } from '../performanceCheck'

interface Request extends NextApiRequest {
	body: {
		newPassword: string,
	}
}

type Options = {
	userId: string,
} & DefaultOptions

export const changePassword = async (req: Request, res: NextApiResponse, options: Options) => {
	const { method, body: { newPassword } } = req
	const { userId, transaction } = options
	transaction.setName(`${method} - api/users/{userId}/changePassword`)
	const token = authenticate(req, res, { transaction })

	switch (method) {
		case 'POST': {
			if (!newPassword) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			await monitorAsync(async () => faunaClient(token.secret).query(
				q.Update(q.Ref(q.Collection('users'), userId), { credentials: { password: newPassword } }),
			).catch((error: unknown) => {
				if (error instanceof errors.Unauthorized) {
					const apiError = ApiError.fromCode(401)
					res.status(apiError.statusCode).json({ error: 'Unauthorized' })
					throw apiError
				}
			}), 'faunadb - Update()', transaction)
			return res.status(200).json({ message: 'Your password has been updated' })
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
