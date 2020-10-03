import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import { config } from 'config.server'

import type { Game } from 'types/Games'
import type { Game as IGDBGame } from 'types/IGDB'
import type { Options as DefaultOptions } from '../types'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { serverClient } from '../faunaClient'
import { igdbFetcher, fields, mapIgdbGame, shouldUpdate } from './lib'
import { monitorReturnAsync } from '../performanceCheck'

type Options = {
	gameId: string,
} & DefaultOptions

export const game = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { gameId, transaction } = options
	let fromIgdb = false

	const game = await monitorReturnAsync((span) => serverClient.query<{ data: Game }>(q.Get(q.Match(q.Index('gamesById'), gameId)))
		.then((response) => response.data)
		.catch((error) => {
			if (error instanceof errors.NotFound) {
				fromIgdb = true
				return igdbFetcher<IGDBGame>('/games', res, {
					body: `${fields}; where slug = "${gameId}";`,
					single: true,
					span,
				}).then(mapIgdbGame)
			} else throw error
		}), 'faunadb - Get()', transaction)

	if (fromIgdb) {
		fetcher(`/games`, {
			absoluteUrl: absoluteUrl(req).origin,
			accessToken: config.auth.systemToken,
			body: game,
			method: Method.Post,
		})
	}

	if (!fromIgdb && shouldUpdate(game)) {
		fetcher(`/games/${gameId}`, {
			absoluteUrl: absoluteUrl(req).origin,
			accessToken: config.auth.systemToken,
			method: Method.Patch,
		})
	}

	return res.status(200).json({ ...game })
}
