import type { Options } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'

import { query } from 'faunadb'

import { throwError } from '../errors/ApiError'
import { faunaClient } from '../faunaClient'
import { authenticate, removeRefreshCookie } from '../middleware'
import { monitorAsync } from '../performanceCheck'

export const logout = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { transaction } = options
	transaction.setName(`${method} - api/users/{userId}/logout`)

	switch (method) {
		case 'POST': {
			const { secret } = authenticate(req, res, { transaction })

			await monitorAsync(() => faunaClient(secret, transaction).query(query.Logout(false)).catch((error) => {
				removeRefreshCookie(res, transaction)
				res.status(200).json({ message: 'You have been logged out successfully' })
				throw error
			}), 'faunadb - Logout()', transaction)

			removeRefreshCookie(res, transaction)
			return res.status(200).json({ message: 'You have been logged out successfully' })
		}

		default: throwError(405, res)
	}
}
