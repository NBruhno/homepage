import { config } from 'config.server'
import { query as q } from 'faunadb'
import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { SimpleGame } from 'types/Games'

import { sendError } from '../errors/ApiError'
import { faunaClient } from '../faunaClient'
import { authenticate } from '../middleware'
import { monitorReturnAsync } from '../performanceCheck'
import type { Options } from '../types'

import { shouldUpdate } from './lib'

export const follows = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { transaction } = options
	const token = authenticate(req, res, { transaction })
	res.setHeader('Cache-Control', 'no-cache')

	switch (method) {
		case 'GET': {
			const games = await monitorReturnAsync(() => faunaClient(token.secret).query<{ data: Array<SimpleGame> }>(
				q.Map(
					q.Paginate(
						q.Join(
							q.Match(q.Index('gamesUserDataByOwnerSortByIdAsc'), q.Identity()),
							q.Index('gamesByIdSortByReleaseDateAsc'),
						),
					),
					q.Lambda(
						['releaseDate', 'hype', 'name', 'id', 'cover', 'status', 'lastChecked', 'updatedAt', 'ref'],
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
		default: return sendError(405, res)
	}
}
