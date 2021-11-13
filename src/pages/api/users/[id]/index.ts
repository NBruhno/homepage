import { withSentry } from '@sentry/nextjs'
import { query as q } from 'faunadb'
import { object, string, create } from 'superstruct'

import { monitorAsync } from 'lib/sentryMonitor'

import { authenticate, removeRefreshCookie } from 'api/middleware'
import { apiHandler, faunaClient } from 'api/utils'

const handler = apiHandler({
	validMethods: ['DELETE'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method} api/users/{userId}`,
})
	.delete(async (req, res) => {
		const { secret } = authenticate(req)
		const { id } = create(req.query, object({
			id: string(),
		}))
		await monitorAsync(
			() => faunaClient(secret).query(q.Delete(q.Ref(q.Collection('users'), id))),
			'faunadb - Delete()',
		)

		removeRefreshCookie(res)
		res.status(200).json({ message: 'Your user has been deleted' })
	})

export default withSentry(handler)
