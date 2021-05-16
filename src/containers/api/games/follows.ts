import type { Options } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Game } from 'types/Games'

import { query as q } from 'faunadb'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { serverClient } from '../faunaClient'
import { monitorReturnAsync } from '../performanceCheck'

import { shouldUpdate } from './lib'

export const follows = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { query: { user } } = req
	const { transaction } = options
	res.setHeader('Cache-Control', 'no-cache')

	const games = await monitorReturnAsync(() => serverClient.query<{ data: Array<{ data: Game }> }>(
		q.Map(
			q.Paginate(
				q.Join(
					q.Match(q.Index('gamesUserData_by_owner_sortBy_id_asc'), q.Ref(q.Collection('users'), user)),
					q.Index('games_by_id_sortBy_releaseDate_asc'),
				),
			),
			q.Lambda(['releaseDate', 'ref'], q.Get(q.Var('ref'))),
		),
	).then(({ data }) => data.map(({ data }) => data)), 'faunadb - Map(Paginate(), Lambda())', transaction)

	const gamesToUpdate = games.filter((game) => shouldUpdate(game))
	if (gamesToUpdate.length > 0) {
		fetcher(`/games`, {
			absoluteUrl: absoluteUrl(req).origin,
			accessToken: config.auth.systemToken,
			body: { gamesToUpdate: gamesToUpdate.map(({ id }) => id) },
			method: Method.Put,
		})
	}

	return res.status(200).json({ games })
}
