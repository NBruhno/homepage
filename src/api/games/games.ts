import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, Game, IgdbGame } from 'types'

import { getUnixTime, sub } from 'date-fns'
// @ts-expect-error Missing type for parseJson.
import { query as q, parseJSON } from 'faunadb'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { serverClient, monitorReturnAsync, igdbFetcher, gameFields, mapIgdbGame, gameShouldUpdate } from 'api/utils'

export const games = async (req: NextApiRequest, res: NextApiResponse, options: ApiOptions) => {
	const { transaction } = options
	const { query: { search, take = 15, after, before } } = req

	// We are using IGDB for looking up games, since we do not keep a complete library
	const data = search
		? await igdbFetcher<Array<IgdbGame>>('/games', res, {
			body: `${gameFields}; limit ${take}; search "${search}";`,
			nickname: 'popular',
			span: transaction,
		}).then((igdbGames) => ({ games: igdbGames.map(mapIgdbGame) }))
		: await monitorReturnAsync(() => serverClient(transaction).query<{ data: Array<{ data: Game }>, after: string, before: string }>(
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
		})), 'faunadb - Map(Paginate(Filter(Range(), Lambda())), Lambda())', transaction)

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

	res.setHeader('Cache-Control', `s-maxage=${60 * 60}, stale-while-revalidate`)
	return res.status(200).json(data)
}
