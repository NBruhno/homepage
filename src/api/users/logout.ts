import type { NextApiRequest, NextApiResponse } from 'next'

import { getActiveTransaction } from '@sentry/tracing'
import { query } from 'faunadb'

import { monitorAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { authenticate, removeRefreshCookie } from 'api/middleware'
import { faunaClient } from 'api/utils'

export const logout = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req
	const transaction = getActiveTransaction()
	if (transaction) transaction.setName(`${method} - api/users/{userId}/logout`)

	switch (method) {
		case 'POST': {
			const { secret } = authenticate(req, res)

			await monitorAsync(() => faunaClient(secret).query(query.Logout(false)).catch((error) => {
				removeRefreshCookie(res)
				res.status(200).json({ message: 'You have been logged out successfully' })
				throw error
			}), 'faunadb - Logout()')

			removeRefreshCookie(res)
			return res.status(200).json({ message: 'You have been logged out successfully' })
		}

		default: throw createAndAttachError(405, res)
	}
}
