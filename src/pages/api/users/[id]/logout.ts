import { withSentry } from '@sentry/nextjs'
import { errors, query as q } from 'faunadb'
import { assert, object, string } from 'superstruct'

import { monitorAsync } from 'lib/sentryMonitor'

import { authenticate, removeRefreshCookie } from 'api/middleware'
import { apiHandler, faunaClient } from 'api/utils'

const handler = apiHandler({
	validMethods: ['POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method} api/users/{userId}/logout`,
})
	.post(async (req, res) => {
		const { secret } = authenticate(req)
		assert(req.query, object({
			userId: string(),
		}))

		try {
			await monitorAsync(() => faunaClient(secret).query(q.Logout(false)), 'faunadb - Logout()')

			removeRefreshCookie(res)
			res.status(200).json({ message: 'You have been logged out successfully' })
		} catch (error) {
			if (errors.Unauthorized) {
				removeRefreshCookie(res)
				res.status(200).json({ message: 'Your local session has been terminated but found no active server session' })
			} else {
				throw error
			}
		}
	})

export default withSentry(handler)
