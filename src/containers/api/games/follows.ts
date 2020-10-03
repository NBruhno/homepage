import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { config } from 'config.server'

import type { SimpleGame } from 'types/Games'
import type { Options } from '../types'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { shouldUpdate } from './lib'

import { faunaClient } from '../faunaClient'
import { authenticate } from '../middleware'
import { monitorReturnAsync } from '../performanceCheck'

export const follows = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { transaction } = options
	const token = authenticate(req, res, { transaction })

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

	return res.status(200).json({ following: games })
}
