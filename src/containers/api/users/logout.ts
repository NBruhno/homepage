import { NextApiRequest, NextApiResponse } from 'next'
import { query } from 'faunadb'

import type { Options } from '../types'

import { ApiError } from '../errors/ApiError'
import { authenticate, removeRefreshCookie } from '../middleware'
import { faunaClient } from '../faunaClient'
import { monitorAsync } from '../performanceCheck'

export const logout = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { transaction } = options
	transaction.setName(`${method} - api/users/{userId}/logout`)

	switch (method) {
		case 'POST': {
			const token = authenticate(req, res, { transaction })
			await monitorAsync(() => faunaClient(token.secret).query(query.Logout(false)).catch((error) => {
				removeRefreshCookie(res, transaction)
				res.status(200).json({ message: 'You have been logged out successfully' })
				throw error
			}), 'faunadb - Logout()', transaction)

			removeRefreshCookie(res, transaction)
			return res.status(200).json({ message: 'You have been logged out successfully' })
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
