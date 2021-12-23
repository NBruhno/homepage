import { UserRole } from 'types'

import { withSentry } from '@sentry/nextjs'
import { verify, hash } from 'argon2'
import { create, object, string } from 'superstruct'

import { monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { authenticate } from 'api/middleware'
import { apiHandler, argonDefaultOptions, prisma } from 'api/utils'
import { password } from 'api/validation'

const handler = apiHandler({
	validMethods: ['POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method!} api/users/{userId}/changePassword`,
})
	.post(async (req, res) => {
		const { userId: requestUserId, role } = authenticate(req)
		const { id } = create(req.query, object({ id: string() }))

		const user = await monitorReturnAsync(() => prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				passwordHash: true,
			},
		}), 'prisma - findUnique()')

		if (requestUserId !== id && role !== UserRole.Admin) throw ApiError.fromCode(403)

		const { newPassword, currentPassword } = create(req.body, object({
			currentPassword: password(),
			newPassword: password(),
		}))

		if (!user) throw ApiError.fromCode(404)
		if (!await monitorReturnAsync(async () => verify(user.passwordHash, currentPassword, argonDefaultOptions), 'argon2 - verify')) {
			throw ApiError.fromCodeWithError(401, new Error('Invalid password'))
		}

		const passwordHash = await monitorReturnAsync(() => hash(newPassword, argonDefaultOptions), 'argon2 - hash()')
		await monitorAsync(() => prisma.user.update({
			where: {
				id,
			},
			data: {
				passwordHash,
			},
		}), 'update()')

		return res.status(200).json({ message: 'Password has been updated' })
	})

export default withSentry(handler)
