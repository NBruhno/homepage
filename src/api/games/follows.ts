import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, Game } from 'types'

// @ts-expect-error Missing type for parseJson.
import { query as q, parseJSON } from 'faunadb'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { serverClient, monitorReturnAsync, gameShouldUpdate } from 'api/utils'

export const follows = async (req: NextApiRequest, res: NextApiResponse, options: ApiOptions) => {
	const { query: { user, take = 15, after, before } } = req
	const { transaction } = options

	const data = await monitorReturnAsync(() => serverClient(transaction).query<{ data: Array<{ data: Game }>, after: string, before: string }>(
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
	})), 'faunadb - Map(Paginate(), Lambda())', transaction)

	const gamesToUpdate = data.games.filter((game) => gameShouldUpdate(game))
	if (gamesToUpdate.length > 0) {
		fetcher(`/games`, {
			absoluteUrl: absoluteUrl(req).origin,
			accessToken: config.auth.systemToken,
			body: { gamesToUpdate: gamesToUpdate.map(({ id }) => id) },
			method: Method.Put,
		})
	}

	res.setHeader('Cache-Control', `s-maxage=${60 * 5}, stale-while-revalidate`)
	return res.status(200).json(data)
}
