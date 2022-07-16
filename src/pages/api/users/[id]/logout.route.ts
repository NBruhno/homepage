import { withSentry } from '@sentry/nextjs'
import { assert, object, string } from 'superstruct'

import { apiHandler } from 'lib/api'
import { authenticate, removeRefreshCookie } from 'lib/middleware'

const handler = apiHandler({
	validMethods: ['POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/users/{userId}/logout`,
})
	.post(async (req, res) => {
		authenticate(req)
		assert(req.query, object({ id: string() }))

		removeRefreshCookie(res)
		return res.status(200).json({ message: 'You have been logged out successfully' })
	})

export default withSentry(handler)
