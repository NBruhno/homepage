import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { config } from 'config.server'

import type { Game as IGDBGame } from 'types/IGDB'
import type { SimpleGame } from 'types/Games'
import type { Options } from '../types'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { serverClient } from '../faunaClient'
import { igdbFetcher, fields, mapIgdbGame, shouldUpdate } from './lib'
import { monitorReturnAsync } from '../performanceCheck'

export const games = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { transaction } = options
	const { query: { search } } = req

	const games = search
		? await igdbFetcher<Array<IGDBGame>>('/games', res, {
			body: `${fields}; limit 50; search "${search}";`,
			nickname: 'popular',
			span: transaction,
		}).then((igdbGames) => igdbGames.map(mapIgdbGame))
		: await monitorReturnAsync(() => serverClient.query<{ data: Array<SimpleGame> }>(
			q.Map(
				q.Paginate(q.Range(q.Match(q.Index('gamesSortByHypesDescReleaseDateAsc')), ['', 1597708800000], []), { size: 50 }),
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

	if (!search) {
		if (games.some(shouldUpdate)) {
			const gamesToUpdate = games.filter(shouldUpdate)

			gamesToUpdate.forEach((game) => {
				fetcher(`/games/${game.id}`, {
					absoluteUrl: absoluteUrl(req).origin,
					accessToken: config.auth.systemToken,
					method: Method.Patch,
				})
			})
		}

		if (games.some((game) => shouldUpdate(game, 72))) {
			fetcher(`/games/updateLibrary`, {
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				method: Method.Post,
			})
		}
	}

	return res.status(200).json({ popular: games })
}
