import { getUnixTime, sub } from 'date-fns'
import { query as q } from 'faunadb'
import { chunk, flatten, differenceBy, intersectionBy } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { SimpleGame, Game } from 'types/Games'
import type { Game as IGDBGame } from 'types/IGDB'

import { logger } from 'lib/logger'

import { sendError } from '../errors/ApiError'
import { serverClient } from '../faunaClient'
import { authenticateSystem } from '../middleware'
import { monitorReturnAsync, monitorAsync } from '../performanceCheck'
import type { Options } from '../types'

import { igdbFetcher, fields, mapIgdbGame } from './lib'

export const updateLibrary = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
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
			} else return sendError(400, res)
		}
		case 'PUT': {
			if (body?.gamesToUpdate?.length > 0) {
				gamesToUpdate = await igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: `${fields}; where id = (${body.gamesToUpdate.join(',')}); limit 500;`,
					span: transaction,
					nickname: 'gamesToUpdate',
				}).then((igdbGames) => chunk(igdbGames.map(mapIgdbGame), 200))
				break
			} else return sendError(400, res)
		}
		case 'PATCH': {
			const [knownGames, games] = await monitorReturnAsync((span) => Promise.all([
				monitorReturnAsync(() => serverClient.query<{ data: Array<SimpleGame> }>(
					q.Map(
						q.Paginate(
							q.Match(q.Index('gamesSortByHypeDescReleaseDateAsc')),
							{ size: 100000 }, // This is the limit for Paginate()
						),
						q.Lambda(
							// The Page returns a tuple of SimpleGame, which is then mapped out as an object.
							// When done like this, we only use 1 read operation to get all of the games.
							['hype', 'releaseDate', 'name', 'id', 'cover', 'status', 'lastChecked', 'updatedAt', 'ref'],
							{
								id: q.Var('id'),
								cover: q.Var('cover'),
								hype: q.Var('hype'),
								lastChecked: q.Var('lastChecked'),
								name: q.Var('name'),
								ref: q.Var('ref'),
								releaseDate: q.Var('releaseDate'),
								status: q.Var('status'),
								updatedAt: q.Var('updatedAt'),
							},
						),
					),
				).then(({ data }) => data), 'faunadb - Map(Paginate(), Lambda())', span),
				monitorReturnAsync((igdbSpan) => Promise.all([
					igdbFetcher<Array<IGDBGame>>('/games', res, {
						body: `${fields}; limit 500; where (first_release_date >= ${twoMonthsBackTimestamp} & hypes >= 3) | (first_release_date >= ${twoMonthsBackTimestamp} & follows >= 3); sort id asc;`,
						nickname: 'popular, 0-500',
						span: igdbSpan,
					}).then((igdbGames) => igdbGames.map(mapIgdbGame)),
					igdbFetcher<Array<IGDBGame>>('/games', res, {
						body: `${fields}; limit 500; offset 500; where (first_release_date >= ${twoMonthsBackTimestamp} & hypes >= 3) | (first_release_date >= ${twoMonthsBackTimestamp} & follows >= 3); sort id asc;`,
						nickname: 'popular, 500-1000',
						span: igdbSpan,
					}).then((igdbGames) => igdbGames.map(mapIgdbGame)),
				]), 'Promise.all()', span).then(flatten),
			]), 'Promise.all()', transaction)

			const outdatedGames = intersectionBy(games, knownGames, 'id') // Finds games that are possibly outdated.
			const newGames = differenceBy(games, knownGames, 'id') // Only interested in creating new unique games.

			// Results are chunked to prevent big payload sizes. AWS Lambda constraint.
			gamesToUpdate = chunk(outdatedGames, 200)
			gamesToCreate = chunk(newGames, 200)
			break
		}
		default: return sendError(405, res)
	}

	if (gamesToUpdate.length > 0 || gamesToCreate.length > 0) {
		// Collect all the update & create query chunks into one request towards FaunaDB to reduce connections and avoid payload limits.
		await monitorAsync(async (span) => Promise.all([
			...gamesToUpdate.map((listOfGames) => monitorAsync(() => serverClient.query(
				q.Do(
					listOfGames.map((game) => q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), game.id))), {
						data: {
							...game,
							lastChecked: getUnixTime(new Date()),
						},
					})),
				),
			), `faunadb - Do(Update() * ${listOfGames.length})`, span)),
			...gamesToCreate.map((listOfGames) => monitorAsync(() => serverClient.query(
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

	logger.info(`Library update completed. ${flatten(gamesToUpdate).length} games updated & ${flatten(gamesToCreate).length} games created.`)

	res.status(200).json({
		message: `Library update completed. ${flatten(gamesToUpdate).length} games updated & ${flatten(gamesToCreate).length} games created.`,
	})
}
