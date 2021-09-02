import type { NextApiResponse } from 'next'
import type { Describe } from 'superstruct'
import type { Game, IgdbGame, GameSimple } from 'types'

import { withSentry } from '@sentry/nextjs'
import { getUnixTime, sub } from 'date-fns'
import { query as q, parseJSON } from 'faunadb'
import { chunk, differenceBy, intersectionBy } from 'lodash'
import { optional, string, object, create, pattern, coerce, number, size, array, any } from 'superstruct'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'
import { logger } from 'lib/logger'
import { monitorReturnAsync, monitorAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'
import { serverClient, gameShouldUpdate, mapIgdbGame, gameFields, igdbFetcher, apiHandler, setCache } from 'api/utils'

const updateGames = async (
	{ gamesToUpdate = [[]], gamesToCreate = [[]], res }: { gamesToUpdate?: Array<Array<Game>>, gamesToCreate?: Array<Array<Game>>, res: NextApiResponse },
) => {
	if (gamesToUpdate.length > 0 || gamesToCreate.length > 0) {
		// Collect all the update & create query chunks into one request towards FaunaDB to reduce connections and avoid payload limits.
		await monitorAsync(async (span) => Promise.all([
			...gamesToUpdate.map((listOfGames) => monitorAsync(() => serverClient().query(
				q.Do(
					listOfGames.map((game) => q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), game.id))), {
						data: {
							...game,
							lastChecked: getUnixTime(new Date()),
						},
					})),
				),
			), `faunadb - Do(Update() * ${listOfGames.length})`, span)),
			...gamesToCreate.map((listOfGames) => monitorAsync(() => serverClient().query(
				q.Do(
					listOfGames.map((game) => q.Create(q.Collection('games'), {
						data: {
							...game,
							lastChecked: getUnixTime(new Date()),
						},
					})),
				),
			), `faunadb - Do(Create() * ${listOfGames.length})`, span)),
		]), 'Promise.all()')
	}

	logger.info(`Library update completed. ${gamesToUpdate.flat().length} games updated & ${gamesToCreate.flat().length} games created.`)

	res.status(200).json({
		message: `Library update completed. ${gamesToUpdate.flat().length} games updated & ${gamesToCreate.flat().length} games created.`,
	})
}

const Query = object({
	take: optional(coerce(number(), pattern(string(), /[0-50]/), (value) => parseInt(value, 10))),
	user: optional(size(pattern(string(), /\d+/), 18)),
	after: optional(string()),
	before: optional(string()),
	search: optional(string()),
})

const BodyPost: Describe<{ gamesToCreate: Array<Game> }> = object({
	gamesToCreate: array(any()),
})

const BodyPut: Describe<{ gamesToUpdate: Array<Game> }> = object({
	gamesToUpdate: array(any()),
})

const handler = apiHandler({ validMethods: ['GET', 'POST', 'PUT', 'PATCH'] })
	.get(async (req, res) => {
		const { user, search, take = 15, after, before } = create(req.query, Query)

		if (user) {
			const data = await monitorReturnAsync(() => serverClient().query<{ data: Array<{ data: Game }>, after: string, before: string }>(
				q.Map(
					q.Paginate(
						q.Join(
							q.Match(q.Index('gamesUserData_by_owner_sortBy_id_asc'), q.Ref(q.Collection('users'), user)),
							q.Index('games_by_id_sortBy_releaseDate_asc'),
						), { size: take, after: after ? parseJSON(after) : undefined, before: before ? parseJSON(before) : undefined },
					),
					q.Lambda(['releaseDate', 'ref'], q.Get(q.Var('ref'))),
				),
			).then(({ data, before, after }) => ({
				games: data.map(({ data }) => data),
				before: before ? JSON.stringify(before as string) : undefined,
				after: after ? JSON.stringify(after as string) : undefined,
			})), 'faunadb - Map(Paginate(), Lambda())')

			const gamesToUpdate = data.games.filter((game) => gameShouldUpdate(game))
			if (gamesToUpdate.length > 0) {
				fetcher(`/games`, {
					absoluteUrl: absoluteUrl(req).origin,
					accessToken: config.auth.systemToken,
					body: { gamesToUpdate: gamesToUpdate.map(({ id }) => id) },
					method: Method.Put,
				})
			}

			setCache({ strategy: 'StaleWhileRevalidate', duration: 5, res })
			res.status(200).json(data)
		} else {
			const data = search
				? await igdbFetcher<Array<IgdbGame>>('/games', res, {
					body: `${gameFields}; limit ${take}; search "${search}";`,
					nickname: 'popular',
				}).then((igdbGames) => ({ games: igdbGames.map(mapIgdbGame) }))
				: await monitorReturnAsync(() => serverClient().query<{ data: Array<{ data: Game }>, after: string, before: string }>(
					q.Map(
						q.Paginate(q.Filter(
						// Index returns a tuple of [hype, releaseDate, ref]
							q.Range(q.Match(q.Index('games_sortBy_hype_desc_releaseDate_asc_ref')), '', 0),
							q.Lambda(
								['hype', 'releaseDate', 'ref'],
								q.GTE(q.Var('releaseDate'), getUnixTime(sub(new Date(), { months: 2 }))),
							),
						), { size: take, after: after ? parseJSON(after) : undefined, before: before ? parseJSON(before) : undefined }),
						q.Lambda(
							['hype', 'releaseDate', 'ref'],
							q.Get(q.Var('ref')),
						),
					),
				).then(({ data, before, after }) => ({
					games: data.map(({ data }) => data),
					before: before ? JSON.stringify(before as string) : undefined,
					after: after ? JSON.stringify(after as string) : undefined,
				})), 'faunadb - Map(Paginate(Filter(Range(), Lambda())), Lambda())')

			if (!search) {
				const gamesToUpdate = data.games.filter((game) => gameShouldUpdate(game))
				if (gamesToUpdate.length > 0) {
					fetcher(`/games`, {
						absoluteUrl: absoluteUrl(req).origin,
						accessToken: config.auth.systemToken,
						body: { gamesToUpdate: gamesToUpdate.map(({ id }) => id) },
						method: Method.Put,
					})
				}

				if (!after && data.games.some((game) => gameShouldUpdate(game))) {
					fetcher(`/games`, {
						absoluteUrl: absoluteUrl(req).origin,
						accessToken: config.auth.systemToken,
						method: Method.Patch,
					})
				}
			}

			setCache({ strategy: 'StaleWhileRevalidate', duration: 60, res })
			res.status(200).json(data)
		}
	})
	.post(async (req, res) => {
		const { gamesToCreate } = create(req.body, BodyPost)
		if (gamesToCreate?.length > 0) {
			await updateGames({ gamesToCreate: chunk(gamesToCreate, 200), res })
		} else throw ApiError.fromCode(400)
	})
	.put(async (req, res) => {
		const { gamesToUpdate } = create(req.body, BodyPut)
		if (gamesToUpdate?.length > 0) {
			const outdatedGames = await igdbFetcher<Array<IgdbGame>>('/games', res, {
				body: `${gameFields}; where id = (${gamesToUpdate.join(',')}); limit 500;`,
				nickname: 'gamesToUpdate',
			}).then((igdbGames) => chunk(igdbGames.map(mapIgdbGame), 200))
			await updateGames({ gamesToUpdate: outdatedGames, res })
		} else throw ApiError.fromCode(400)
	})
	.patch(async (_req, res) => { // This request will check the whole library for new data and update if any is found
		const twoMonthsBackTimestamp = getUnixTime(sub(Date.now(), { months: 2 }))
		const [knownGames, games] = await monitorReturnAsync((span) => Promise.all([
			monitorReturnAsync(() => serverClient().query<{ data: Array<GameSimple> }>(
				q.Map(
					q.Paginate(
						q.Match(q.Index('gamesIdRef')),
						{ size: 100000 }, // This is the limit for Paginate()
					),
					q.Lambda(
						// The Page returns a tuple of GameSimple, which is then mapped out as an object.
						// When done like this, we only use 1 read operation to get all of the games.
						['id', 'ref'],
						{
							id: q.Var('id'),
							ref: q.Var('ref'),
						},
					),
				),
			).then(({ data }) => data), 'faunadb - Map(Paginate(), Lambda())', span),
			igdbFetcher<Array<IgdbGame>>('/games', res, {
				body: `${gameFields}; limit 500; where (first_release_date >= ${twoMonthsBackTimestamp} & hypes >= 3) | (first_release_date >= ${twoMonthsBackTimestamp} & follows >= 3); sort id asc;`,
				nickname: 'popular, 0-500',
				span,
			}).then((igdbGames) => igdbGames.map(mapIgdbGame)),
		]), 'Promise.all()')

		const outdatedGames = intersectionBy(games, knownGames, 'id') // Finds games that are possibly outdated.
		const newGames = differenceBy(games, knownGames, 'id') // Only interested in creating new unique games.

		// Results are chunked to prevent big payload sizes. AWS Lambda constraint.
		await updateGames({ gamesToCreate: chunk(newGames, 200), gamesToUpdate: chunk(outdatedGames, 200), res })
	})

export default withSentry(handler)
