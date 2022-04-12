import type { IgdbGame } from 'types'

import { withSentry } from '@sentry/nextjs'
import { coerce, create, number, object, string } from 'superstruct'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'
import { monitorAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { authenticateSystem } from 'api/middleware'
import { igdbFetcher, gameFields, mapIgdbGame, setCache, apiHandler, prisma } from 'api/utils'
import { game as gameValidator } from 'api/validation'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

const handler = apiHandler({
	validMethods: ['GET', 'PUT', 'PATCH'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}`,
})
	.get(async (req, res) => {
		const { id } = create(req.query, Query)

		const game = await monitorAsync(() => prisma.game.findUnique({
			where: {
				id,
			},
		}), 'db:prisma', 'findUnique()')

		if (!game) {
			const igdbGame = await igdbFetcher('/games', res, {
				body: `${gameFields}; where id = ${id};`,
				shouldReturnFirst: true,
				nickname: 'find unknown game',
			}).then((game: IgdbGame | undefined) => {
				if (game) return mapIgdbGame(game)
				throw ApiError.fromCode(404)
			})

			const createdGame = await monitorAsync(() => fetcher(`/games`, {
				body: igdbGame,
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				method: Method.Post,
			}), 'http:internal', 'POST /games')
			setCache({ strategy: 'Default', duration: 5, res })
			return res.status(200).json(createdGame)
		}

		setCache({ strategy: 'Default', duration: 5, res })
		return res.status(200).json(game)
	})
	.put(async (req, res) => {
		authenticateSystem(req)
		const { id } = create(req.query, Query)
		const game = create(req.body, gameValidator)

		const createdGame = await monitorAsync(() => prisma.game.upsert({
			where: { id },
			update: game,
			create: game,
		}), 'db:prisma', 'upsert()')

		res.setHeader('Location', `/api/games/${createdGame.id}`)
		return res.status(200).json(createdGame)
	})
	.patch(async (req, res) => {
		authenticateSystem(req)
		const game = create(req.body, gameValidator)
		const { id } = create(req.query, Query)

		const updatedGame = await monitorAsync(() => prisma.game.update({
			where: { id },
			data: game,
		}), 'db:prisma', 'update()')

		res.setHeader('Location', `/api/games/${updatedGame.id}`)
		return res.status(200).json(updatedGame)
	})

export default withSentry(handler)
