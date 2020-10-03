import { getUnixTime, sub } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { config } from 'config.server'

import type { Game as IGDBGame } from 'types/IGDB'
import type { Options } from '../types'
import type { SimpleGame } from 'types/Games'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { igdbFetcher, fields, mapIgdbGame, shouldUpdate } from './lib'

import { authenticateSystem } from '../middleware'
import { monitorReturnAsync } from '../performanceCheck'
import { serverClient } from '../faunaClient'

export const updateLibrary = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { transaction } = options
	authenticateSystem(req, res)

	const knownGames = await monitorReturnAsync(() => serverClient.query<{ data: Array<SimpleGame> }>(
		q.Map(
			q.Paginate(q.Range(q.Match(q.Index('gamesSortByHypesDescReleaseDateAsc')), ['', 1597708800000], []), { size: 100000 }),
			q.Lambda(
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
	).then(({ data }) => data), 'faunadb - Map(Paginate(), Lambda())', transaction)

	const games = await igdbFetcher<Array<IGDBGame>>('/games', res, {
		body: `${fields}; sort first_release_date asc; limit 500; where first_release_date > ${getUnixTime(sub(Date.now(), { months: 2 }))} & hypes >= 0; sort hypes desc;`,
		nickname: 'popular',
		span: transaction,
	}).then((igdbGames) => igdbGames.map(mapIgdbGame))

	const gamesToUpdate = knownGames.filter((knownGame) => games.some((newGame) => shouldUpdate(knownGame) && knownGame.id === newGame.id))
	const gamesToCreate = games.filter((newGame) => !knownGames.some((knownGame) => newGame.id === knownGame.id))

	if (gamesToUpdate.length > 0) {
		gamesToUpdate.forEach((game) => {
			fetcher(`/games/${game.id}`, {
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				method: Method.Patch,
			})
		})
	}

	if (gamesToCreate.length > 0) {
		gamesToCreate.forEach((game) => {
			fetcher(`/games`, {
				absoluteUrl: absoluteUrl(req).origin,
				body: game,
				accessToken: config.auth.systemToken,
				method: Method.Post,
			})
		})
	}

	return res.status(200).json({ message: `Library update initialized. ${gamesToUpdate.length} games to update & ${gamesToCreate.length} to create.` })
}
