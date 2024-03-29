import { create, object, string, coerce, number, boolean } from 'superstruct'

import { apiHandler, prisma } from 'lib/api'
import { authenticate } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

export default apiHandler({
	validMethods: ['POST'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/follows`,
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
