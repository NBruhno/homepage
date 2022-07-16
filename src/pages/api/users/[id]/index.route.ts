import { UserRole } from 'types'

import { withSentry } from '@sentry/nextjs'
import { object, string, create } from 'superstruct'

import { apiHandler, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { authenticate, removeRefreshCookie } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const handler = apiHandler({
	validMethods: ['DELETE'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/users/{userId}`,
})
	.delete(async (req, res) => {
		const { userId: requestUserId, role } = authenticate(req)
		const { id } = create(req.query, object({ id: string() }))
		if (requestUserId !== id && role !== UserRole.Admin) throw ApiError.fromCode(403)

		await monitorAsync(() => prisma.user.delete({
			where: {
				id,
			},
		}), 'db:prisma', 'delete()')

		if (requestUserId === id) removeRefreshCookie(res)
		return res.status(200).json({ message: 'The user has been deleted' })
	})

export default withSentry(handler)
