import { UserRole } from 'types'

import { object, string, create, optional } from 'superstruct'

import { email, username } from 'validation/shared'

import { apiHandler, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { authenticate, removeRefreshCookie } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

export default apiHandler({
	validMethods: ['GET', 'DELETE', 'PATCH'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/users/{userId}`,
})
	.get(async (req, res) => {
		authenticate(req, { allowedRoles: [UserRole.Admin] })
		const { id } = create(req.query, object({ id: string() }))

		const user = await monitorAsync(() => prisma.users.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				email: true,
				role: true,
				steamId: true,
				username: true,
				createdAt: true,
				updatedAt: true,
			},
		}), 'db:prisma', 'findUnique()')

		return res.status(200).json(user)
	})
	.patch(async (req, res) => {
		const { userId: requestUserId, role } = authenticate(req)
		const { id } = create(req.query, object({ id: string() }))
		if (requestUserId !== id && role !== UserRole.Admin) throw ApiError.fromCode(403)

		const data = create(req.body, object({
			steamId: optional(string()),
			email: optional(email()),
			username: optional(username()),
		}))

		await monitorAsync(() => prisma.users.update({
			where: {
				id,
			},
			data,
		}), 'db:prisma', 'update()')

		return res.status(200).json({ message: 'The user has been updated' })
	})
	.delete(async (req, res) => {
		const { userId: requestUserId, role } = authenticate(req)
		const { id } = create(req.query, object({ id: string() }))
		if (requestUserId !== id && role !== UserRole.Admin) throw ApiError.fromCode(403)

		await monitorAsync(() => prisma.users.delete({
			where: {
				id,
			},
		}), 'db:prisma', 'delete()')

		if (requestUserId === id) removeRefreshCookie(res)
		return res.status(200).json({ message: 'The user has been deleted' })
	})
