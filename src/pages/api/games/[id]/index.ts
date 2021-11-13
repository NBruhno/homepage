import type { Game, IgdbGame } from 'types'

import { withSentry } from '@sentry/nextjs'
import { getUnixTime } from 'date-fns'
import { query as q, errors } from 'faunadb'
import { coerce, create, number, object, string } from 'superstruct'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'
import { monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { authenticateSystem } from 'api/middleware'
import { serverClient, igdbFetcher, gameFields, mapIgdbGame, gameShouldUpdate, setCache, apiHandler } from 'api/utils'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

const handler = apiHandler({
	validMethods: ['GET', 'PATCH'],
	transactionName: (req) => `${req.method} api/games/{gameId}`,
})
	.get(async (req, res) => {
		const { id } = create(req.query, Query)
		let fromIgdb = false

		const game = await monitorReturnAsync((span) => serverClient().query<{ data: Game }>(q.Get(q.Match(q.Index('gamesById'), id)))
			.then((response) => response.data)
			.catch(async (error) => {
				if (error instanceof errors.NotFound) {
					fromIgdb = true
					return igdbFetcher<IgdbGame>('/games', res, {
						body: `${gameFields}; where id = ${id};`,
						single: true,
						span,
					}).then((game) => {
						if (game) return mapIgdbGame(game)
						throw ApiError.fromCode(404)
					})
				} else throw error
			}), 'faunadb - Get()')

		if (fromIgdb) {
			fetcher(`/games`, {
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				body: { gamesToCreate: [game] },
				method: Method.Post,
			})
		}

		if (!fromIgdb && gameShouldUpdate(game)) {
			fetcher(`/games/${id}`, {
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				method: Method.Patch,
			})
		}

		setCache({ strategy: 'Default', duration: 1, res })
		res.status(200).json({ ...game })
	})
	.patch(async (req, res) => {
		authenticateSystem(req)
		const { body }: { body: Game } = req
		const { id } = create(req.query, Query)

		const game = body ?? await igdbFetcher<IgdbGame>('/games', res, {
			body: `${gameFields}; where id = ${id};`,
			single: true,
		}).then(mapIgdbGame)

		await monitorAsync(() => serverClient().query(q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), id))), {
			data: {
				...game,
				lastChecked: getUnixTime(new Date()),
			},
		})), 'faunadb - Update()')

		res.status(200).json({ message: `${id} created` })
	})

export default withSentry(handler)
