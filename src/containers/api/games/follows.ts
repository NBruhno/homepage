import { query as q } from 'faunadb'
import type { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

import type { Game } from 'types/Games'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { faunaClient } from '../faunaClient'
import { authenticate } from '../middleware'
import { monitorReturnAsync } from '../performanceCheck'
import type { Options } from '../types'

import { shouldUpdate } from './lib'

export const follows = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { query: { user } } = req
	const { transaction } = options
	const { secret } = authenticate(req, res, { transaction })!
	res.setHeader('Cache-Control', 'no-cache')

	const games = await monitorReturnAsync(() => faunaClient(secret).query<{ data: Array<{ data: Game }> }>(
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
