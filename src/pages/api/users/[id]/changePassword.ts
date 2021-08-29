import { withSentry } from '@sentry/nextjs'
import { errors, query as q } from 'faunadb'
import { create, object, string } from 'superstruct'

import { monitorAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { authenticate } from 'api/middleware'
import { apiHandler, faunaClient } from 'api/utils'
import { password } from 'api/validation'

const handler = apiHandler({
	validMethods: ['POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method} api/users/{userId}/changePassword`,
})
	.post(async (req, res) => {
		const { secret } = authenticate(req)
		const { userId } = create(req.query, object({
			userId: string(),
		}))
		const { newPassword } = create(req.body, object({
			newPassword: password(),
		}))

		await monitorAsync(async () => faunaClient(secret).query(
			q.Update(q.Ref(q.Collection('users'), userId), { credentials: { password: newPassword } }),
		).catch((error: unknown) => {
			if (error instanceof errors.Unauthorized) throw ApiError.fromCode(401)
		}), 'faunadb - Update()')
		res.status(200).json({ message: 'Your password has been updated' })
	})

export default withSentry(handler)
