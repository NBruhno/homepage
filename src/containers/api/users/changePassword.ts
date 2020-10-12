import { NextApiRequest, NextApiResponse } from 'next'
import { errors, query as q } from 'faunadb'

import type { Options as DefaultOptions } from '../types'

import { throwError } from '../errors/ApiError'
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
			if (!newPassword) throwError(400, res)

			await monitorAsync(async () => faunaClient(token.secret).query(
				q.Update(q.Ref(q.Collection('users'), userId), { credentials: { password: newPassword } }),
			).catch((error: unknown) => {
				if (error instanceof errors.Unauthorized) throwError(401, res)
				throw error
			}), 'faunadb - Update()', transaction)
			return res.status(200).json({ message: 'Your password has been updated' })
		}

		default: throwError(405, res)
	}
}
