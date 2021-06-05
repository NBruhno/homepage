import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'

import { query } from 'faunadb'

import { createAndAttachError } from 'api/errors'
import { authenticate, removeRefreshCookie } from 'api/middleware'
import { faunaClient, monitorAsync } from 'api/utils'

export const logout = async (req: NextApiRequest, res: NextApiResponse, options: ApiOptions) => {
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

		default: throw createAndAttachError(405, res)
	}
}
