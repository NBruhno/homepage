import { getUnixTime, sub } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { config } from 'config.server'

import type { Game as IGDBGame } from 'types/IGDB'
import type { SimpleGame } from 'types/Games'
import type { Options } from '../types'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { igdbFetcher, fields, mapIgdbGame, shouldUpdate } from './lib'
import { serverClient } from '../faunaClient'
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
				q.Paginate(q.Range(q.Match(q.Index('gamesSortByHypeDescReleaseDateAsc')), ['', getUnixTime(sub(new Date(), { months: 2 }))], [0, '']), { size: 50 }),
				q.Lambda(
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
		).then(({ data }) => data), 'faunadb - Map(Paginate(), Lambda())', transaction)

	if (!search) {
		const gamesToUpdate = games.filter((game) => shouldUpdate(game))
		if (gamesToUpdate.length > 0) {
			fetcher(`/games`, {
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				body: { gamesToUpdate: gamesToUpdate.map(({ id }) => id) },
				method: Method.Put,
			})
		}

		if (games.some((game) => shouldUpdate(game))) {
			fetcher(`/games`, {
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				method: Method.Patch,
			})
		}
	}

	res.setHeader('Cache-Control', `s-maxage=${60 * 60}, stale-while-revalidate`)
	return res.status(200).json({ games })
}
