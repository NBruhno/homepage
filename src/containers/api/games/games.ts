import type { Options } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Game } from 'types/Games'
import type { Game as IGDBGame } from 'types/IGDB'

import { getUnixTime, sub } from 'date-fns'
import { query as q } from 'faunadb'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { serverClient } from '../faunaClient'
import { monitorReturnAsync } from '../performanceCheck'

import { igdbFetcher, fields, mapIgdbGame, shouldUpdate } from './lib'

export const games = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { transaction } = options
	const { query: { search } } = req

	// We are using IGDB for looking up games, since we do not keep a complete library
	const games = search
		? await igdbFetcher<Array<IGDBGame>>('/games', res, {
			body: `${fields}; limit 50; search "${search}";`,
			nickname: 'popular',
			span: transaction,
		}).then((igdbGames) => igdbGames.map(mapIgdbGame))
		: await monitorReturnAsync(() => serverClient.query<{ data: Array<{ data: Game }> }>(
			q.Map(
				q.Paginate(q.Filter(
					// Index returns a tuple of [hype, releaseDate, ref]
					q.Range(q.Match(q.Index('games_sortBy_hype_desc_releaseDate_asc_ref')), '', 0),
					q.Lambda(
						['hype', 'releaseDate', 'ref'],
						q.GTE(q.Var('releaseDate'), getUnixTime(sub(new Date(), { months: 2 }))),
					),
				), { size: 30 }),
				q.Lambda(
					['hype', 'releaseDate', 'ref'],
					q.Get(q.Var('ref')),
				),
			),
		).then(({ data }) => data.map(({ data }) => data)), 'faunadb - Map(Paginate(Filter(Range(), Lambda())), Lambda())', transaction)

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
