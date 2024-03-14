import { UserRole } from 'types'

import { verify, hash } from 'argon2'
import { create, object, string } from 'superstruct'

import { password } from 'validation/shared'

import { apiHandler, argonDefaultOptions, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { authenticate } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

export default apiHandler({
	validMethods: ['POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/users/{userId}/changePassword`,
})
	.post(async (req, res) => {
		const { userId: requestUserId, role } = authenticate(req)
		const { id } = create(req.query, object({ id: string() }))

		const user = await monitorAsync(() => prisma.users.findUnique({
			where: {
				id,
			},
			select: {
				passwordHash: true,
			},
		}), 'db:prisma', 'findUnique()')

		if (requestUserId !== id && role !== UserRole.Admin) throw ApiError.fromCode(403)

		const { newPassword, currentPassword } = create(req.body, object({
			currentPassword: password(),
			newPassword: password(),
		}))

		if (!user) throw ApiError.fromCode(404)
		if (!await monitorAsync(async () => verify(user.passwordHash, currentPassword), 'argon2', 'verify()')) {
			throw ApiError.fromCodeWithError(401, new Error('Invalid password'))
		}

		const passwordHash = await monitorAsync(() => hash(newPassword, argonDefaultOptions), 'argon2', 'hash()')
		await monitorAsync(() => prisma.users.update({
			where: {
				id,
			},
			data: {
				passwordHash,
			},
		}), 'db:prisma', 'update()')

		return res.status(200).json({ message: 'Password has been updated' })
	})
