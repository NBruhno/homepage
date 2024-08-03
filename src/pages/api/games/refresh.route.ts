import { array, create, number } from 'superstruct'

import { config } from 'config.server'

import { absoluteUrl, apiHandler } from 'lib/api'
import { Method, fetcher } from 'lib/fetcher'
import { authenticate } from 'lib/middleware'

const validator = array(number())

export default apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		const { token } = await authenticate(req)
		const gamesToFollow = create(req.body, validator)

		await Promise.all(gamesToFollow.map(async (gameId) => fetcher<{ count: number }>(`/queues/games/create`, {
			absoluteUrl: absoluteUrl(req).origin,
			customHeaders: {
				'x-secret': config.igdb.webhookSecret,
			},
			method: Method.Post,
			body: { id: gameId },
		})))

		await fetcher<{ count: number }>(`/queues/games/consume`, {
			absoluteUrl: absoluteUrl(req).origin,
			accessToken: config.auth.systemToken,
			method: Method.Post,
		})

		for (let i = 0; i < gamesToFollow.length; i++) {
			await fetcher<{ count: number }>(`/games/${gamesToFollow[i]}/follows`, {
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: token,
				method: Method.Post,
				body: { isFollowing: true },
			})
		}

		return res.status(200).json({})
	})
