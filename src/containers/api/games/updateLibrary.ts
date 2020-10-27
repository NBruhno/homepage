import { getUnixTime, sub } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { chunk, flatten } from 'lodash-es'
import { query as q } from 'faunadb'

import type { Game as IGDBGame } from 'types/IGDB'
import type { Options } from '../types'
import type { SimpleGame, Game } from 'types/Games'

import { igdbFetcher, fields, mapIgdbGame } from './lib'

import { authenticateSystem } from '../middleware'
import { monitorReturnAsync, monitorAsync } from '../performanceCheck'
import { serverClient } from '../faunaClient'
import { sendError } from '../errors/ApiError'

export const updateLibrary = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { transaction } = options
	const { body, method } = req
	authenticateSystem(req, res)

	let gamesToUpdate: Array<Array<Game>> = [[]]
	let gamesToCreate: Array<Array<Game>> = [[]]
	const gamesToDelete: Array<Array<Game>> = [[]]

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
					body: `${fields}; where slug = ("${body.gamesToUpdate.join('","')}"); limit 500;`,
					span: transaction,
				}).then((igdbGames) => chunk(igdbGames.map(mapIgdbGame), 200))
				break
			} else return sendError(400, res)
		}
		case 'PATCH': {
			const [knownGames, games] = await monitorReturnAsync((span) => Promise.all([
				monitorReturnAsync(() => serverClient.query<{ data: Array<SimpleGame> }>(
					q.Map(
						q.Paginate(
							q.Range(
								q.Match(q.Index('gamesSortByHypesDescReleaseDateAsc')),
								['', getUnixTime(sub(Date.now(), { months: 2 }))], [],
							), { size: 100000 }, // This is the limit for Paginate()
						),
						q.Lambda(
							// The Page returns a tuple of SimpleGame, which is then mapped out as an object.
							// When done like this, we only use 1 read operation to get all of the games.
							['hype', 'releaseDate', 'name', 'id', 'cover', 'status', 'lastChecked', 'updatedAt', 'ref'],
							{
								id: q.Var('id'),
								name: q.Var('name'),
								cover: q.Var('cover'),
								releaseDate: q.Var('releaseDate'),
								hype: q.Var('hype'),
								status: q.Var('status'),
								lastChecked: q.Var('lastChecked'),
								updatedAt: q.Var('updatedAt'),
								ref: q.Var('ref'),
							},
						),
					),
				).then(({ data }) => data), 'faunadb - Map(Paginate(), Lambda())', span),
				monitorReturnAsync((igdbSpan) => Promise.all([
					igdbFetcher<Array<IGDBGame>>('/games', res, {
						body: `${fields}; sort first_release_date asc; limit 500; where first_release_date > ${getUnixTime(sub(Date.now(), { months: 2 }))} & hypes >= 0; sort hypes desc;`,
						nickname: 'popular, 0-500',
						span: igdbSpan,
					}).then((igdbGames) => igdbGames.map(mapIgdbGame)),
					igdbFetcher<Array<IGDBGame>>('/games', res, {
						body: `${fields}; sort first_release_date asc; limit 500; offset 500; where first_release_date > ${getUnixTime(sub(Date.now(), { months: 2 }))} & hypes >= 0; sort hypes desc;`,
						nickname: 'popular, 500-1000',
						span: igdbSpan,
					}).then((igdbGames) => igdbGames.map(mapIgdbGame)),
				]), 'Promise.all()', span).then(flatten),
			]), 'Promise.all()', transaction)

			// Finds games that are possibly outdated. Results are chunked to prevent big payload sizes. AWS Lambda constraint.
			gamesToUpdate = chunk(games
				.filter((newGame) => knownGames
					.some((knownGame) => knownGame.id === newGame.id)), 200)
			// Only interested in creating new unique games. Results are chunked to prevent big payload sizes. AWS Lambda constraint.
			gamesToCreate = chunk(games
				.filter((newGame) => !knownGames
					.some((knownGame) => knownGame.id === newGame.id)), 200)

			const otherOutdatedGames = chunk(knownGames.filter((knownGame) => !games.some((newGame) => knownGame.id === newGame.id))
				.map(({ id }) => id), 200)

			if (flatten(otherOutdatedGames).length > 0) {
				const outdatedGames = await monitorReturnAsync((span) => Promise.all(
					otherOutdatedGames.map((listOfGames) => monitorReturnAsync(() => igdbFetcher<Array<IGDBGame>>('/games', res, {
						body: `${fields}; where slug = ("${listOfGames.join('","')}"); limit 500;`,
						nickname: `${listOfGames.length} outdated games`,
						span,
					}).then((igdbGames) => igdbGames.map(mapIgdbGame)), '', span)),
				), '', transaction)

				gamesToUpdate.push(...outdatedGames)
			}
			break
		}
		default: return sendError(405, res)
	}

	console.log(flatten(gamesToUpdate).filter(({ id }) => id === 'baldurs-gate-3'))

	console.log(`Library update completed. ${flatten(gamesToUpdate).length} games updated & ${flatten(gamesToCreate).length} games created.`)

	// if (gamesToUpdate.length > 0 || gamesToCreate.length > 0) {
	// 	// Collect all the update & create query chunks into one request towards FaunaDB to reduce connections and avoid payload limits.
	// 	await monitorAsync((span) => Promise.all([
	// 		...gamesToUpdate.map((listOfGames) => monitorAsync(() => serverClient.query(
	// 			q.Do(
	// 				...listOfGames.map((game) => q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), game.id))), {
	// 					data: {
	// 						...game,
	// 						lastChecked: Date.now(),
	// 					},
	// 				})),
	// 			),
	// 		), `faunadb - Do(Update() * ${listOfGames.length})`, span)),
	// 		...gamesToCreate.map((listOfGames) => monitorAsync(() => serverClient.query(
	// 			q.Do(
	// 				...listOfGames.map((game) => q.Create(q.Collection('games'), {
	// 					data: {
	// 						...game,
	// 						lastChecked: Date.now(),
	// 					},
	// 				})),
	// 			),
	// 		), `faunadb - Do(Create() * ${listOfGames.length})`, span)),
	// 	]), 'Promise.all()', transaction)
	// }

	return res.status(200).json({
		message: `Library update completed. ${flatten(gamesToUpdate).length} games updated & ${flatten(gamesToCreate).length} games created.`,
	})
}
