import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, GameSimple, Game, IgdbGame } from 'types'

import { getUnixTime, sub } from 'date-fns'
import { query as q } from 'faunadb'
import { chunk, differenceBy, intersectionBy } from 'lodash'

import { logger } from 'lib/logger'

import { createAndAttachError } from 'api/errors'
import { authenticateSystem } from 'api/middleware'
import { serverClient, monitorReturnAsync, monitorAsync, igdbFetcher, gameFields, mapIgdbGame } from 'api/utils'

export const updateLibrary = async (req: NextApiRequest, res: NextApiResponse, options: ApiOptions) => {
	const { transaction } = options
	const { body, method } = req
	authenticateSystem(req, res)

	let gamesToUpdate: Array<Array<Game>> = [[]]
	let gamesToCreate: Array<Array<Game>> = [[]]

	const twoMonthsBackTimestamp = getUnixTime(sub(Date.now(), { months: 2 }))

	switch (method) {
		case 'POST': {
			if (body?.gamesToCreate?.length > 0) {
				gamesToCreate = chunk(body?.gamesToCreate, 200)
				break
			} else throw createAndAttachError(400, res)
		}
		case 'PUT': {
			if (body?.gamesToUpdate?.length > 0) {
				gamesToUpdate = await igdbFetcher<Array<IgdbGame>>('/games', res, {
					body: `${gameFields}; where id = (${body.gamesToUpdate.join(',')}); limit 500;`,
					span: transaction,
					nickname: 'gamesToUpdate',
				}).then((igdbGames) => chunk(igdbGames.map(mapIgdbGame), 200))
				break
			} else throw createAndAttachError(400, res)
		}
		case 'PATCH': {
			const [knownGames, games] = await monitorReturnAsync((span) => Promise.all([
				monitorReturnAsync(() => serverClient(transaction).query<{ data: Array<GameSimple> }>(
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
			]), 'Promise.all()', transaction)

			const outdatedGames = intersectionBy(games, knownGames, 'id') // Finds games that are possibly outdated.
			const newGames = differenceBy(games, knownGames, 'id') // Only interested in creating new unique games.

			// Results are chunked to prevent big payload sizes. AWS Lambda constraint.
			gamesToUpdate = chunk(outdatedGames, 200)
			gamesToCreate = chunk(newGames, 200)
			break
		}
		default: throw createAndAttachError(405, res)
	}

	if (gamesToUpdate.length > 0 || gamesToCreate.length > 0) {
		// Collect all the update & create query chunks into one request towards FaunaDB to reduce connections and avoid payload limits.
		await monitorAsync(async (span) => Promise.all([
			...gamesToUpdate.map((listOfGames) => monitorAsync(() => serverClient(transaction).query(
				q.Do(
					listOfGames.map((game) => q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), game.id))), {
						data: {
							...game,
							lastChecked: getUnixTime(new Date()),
						},
					})),
				),
			), `faunadb - Do(Update() * ${listOfGames.length})`, span)),
			...gamesToCreate.map((listOfGames) => monitorAsync(() => serverClient(transaction).query(
				q.Do(
					listOfGames.map((game) => q.Create(q.Collection('games'), {
						data: {
							...game,
							lastChecked: getUnixTime(new Date()),
						},
					})),
				),
			), `faunadb - Do(Create() * ${listOfGames.length})`, span)),
		]), 'Promise.all()', transaction)
	}

	logger.info(`Library update completed. ${gamesToUpdate.flat().length} games updated & ${gamesToCreate.flat().length} games created.`)

	res.status(200).json({
		message: `Library update completed. ${gamesToUpdate.flat().length} games updated & ${gamesToCreate.flat().length} games created.`,
	})
}
