import { withSentry } from '@sentry/nextjs'
import { create, object, string, coerce, number, boolean } from 'superstruct'

import { monitorAsync } from 'lib/sentryMonitor'

import { authenticate } from 'api/middleware'
import { apiHandler, prisma } from 'api/utils'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

const handler = apiHandler({
	validMethods: ['GET', 'POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/follows`,
})
	.get(async (req, res) => {
		const { userId } = authenticate(req)
		const { id } = create(req.query, Query)

		const userData = await monitorAsync(() => prisma.gameUserData.findFirst({
			where: {
				gameId: id,
				ownerId: userId,
			},
		}), 'db:prisma', 'findFirst()')

		return res.status(200).json({ isFollowing: Boolean(userData?.isFollowing) })
	})
	.post(async (req, res) => {
		const { userId } = authenticate(req)
		const { id } = create(req.query, Query)
		const { isFollowing } = create(req.body, object({ isFollowing: boolean() }))

		const userData = await monitorAsync(() => prisma.gameUserData.upsert({
			where: {
				id: {
					gameId: id,
					ownerId: userId,
				},
			},
			create: {
				gameId: id,
				ownerId: userId,
				isFollowing,
			},
			update: {
				isFollowing,
			},
		}), 'db:prisma', 'upsert()')

		return res.status(200).json({ message: `Successfully ${userData.isFollowing ? 'follow' : 'unfollow'}ed the game` })
	})

export default withSentry(handler)
