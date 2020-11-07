import { config } from 'config.server'
import { query as q, errors } from 'faunadb'
import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { Game } from 'types/Games'
import type { Game as IGDBGame } from 'types/IGDB'

import { serverClient } from '../faunaClient'
import { monitorReturnAsync } from '../performanceCheck'
import type { Options as DefaultOptions } from '../types'

import { igdbFetcher, fields, mapIgdbGame, shouldUpdate } from './lib'

type Options = {
	gameId: number,
} & DefaultOptions

export const game = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { gameId, transaction } = options
	let fromIgdb = false

	const game = await monitorReturnAsync((span) => serverClient.query<{ data: Game }>(q.Get(q.Match(q.Index('gamesById'), gameId)))
		.then((response) => response.data)
		.catch(async (error) => {
			if (error instanceof errors.NotFound) {
				fromIgdb = true
				return igdbFetcher<IGDBGame>('/games', res, {
					body: `${fields}; where id = ${gameId};`,
					single: true,
					span,
				}).then(mapIgdbGame)
			} else throw error
		}), 'faunadb - Get()', transaction)

	if (fromIgdb) {
		fetcher(`/games`, {
			absoluteUrl: absoluteUrl(req).origin,
			accessToken: config.auth.systemToken,
			body: { gamesToCreate: [game] },
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

	res.setHeader('Cache-Control', 's-maxage=60')
	return res.status(200).json({ ...game })
}
