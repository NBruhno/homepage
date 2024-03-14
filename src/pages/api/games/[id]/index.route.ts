import type { IgdbGame } from 'types'

import { coerce, create, number, object, string } from 'superstruct'

import { config } from 'config.server'

import { game as gameValidator } from 'validation/api'

import { absoluteUrl, igdbFetcher, gameFields, mapIgdbGame, setCache, apiHandler, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { fetcher, Method } from 'lib/fetcher'
import { authenticateSystem } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

export default apiHandler({
	validMethods: ['GET', 'PUT', 'PATCH'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}`,
})
	.get(async (req, res) => {
		const { id } = create(req.query, Query)

		const game = await monitorAsync(() => prisma.games.findUnique({
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
				throw ApiError.fromCodeWithCause(404, new Error(`Failed to find IGDB game with ID ${id}`))
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

		const createdGame = await monitorAsync(() => prisma.games.upsert({
			where: { id },
			update: game,
			create: game,
		}), 'db:prisma', 'upsert()')

		res.setHeader('Location', `/api/games/${createdGame.id}`)
		return res.status(200).json(createdGame)
	})
	.patch(async (req, res) => {
		authenticateSystem(req)
		const { id } = create(req.query, Query)
		const game = create(req.body, gameValidator)

		const updatedGame = await monitorAsync(() => prisma.games.update({
			where: { id },
			data: game,
		}), 'db:prisma', 'update()')

		res.setHeader('Location', `/api/games/${updatedGame.id}`)
		return res.status(200).json(updatedGame)
	})
