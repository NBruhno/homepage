import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, Game, IgdbGame } from 'types'

import { query as q, errors } from 'faunadb'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'

import { createAndAttachError } from 'api/errors'
import { serverClient, monitorReturnAsync, igdbFetcher, gameFields, mapIgdbGame, gameShouldUpdate } from 'api/utils'

type Options = {
	gameId: number,
} & ApiOptions

export const game = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { gameId, transaction } = options
	let fromIgdb = false

	const game = await monitorReturnAsync((span) => serverClient(transaction).query<{ data: Game }>(q.Get(q.Match(q.Index('gamesById'), gameId)))
		.then((response) => response.data)
		.catch(async (error) => {
			if (error instanceof errors.NotFound) {
				fromIgdb = true
				return igdbFetcher<IgdbGame>('/games', res, {
					body: `${gameFields}; where id = ${gameId};`,
					single: true,
					span,
				}).then((game) => {
					if (game) return mapIgdbGame(game)
					throw createAndAttachError(404, res)
				})
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

	if (!fromIgdb && gameShouldUpdate(game)) {
		fetcher(`/games/${gameId}`, {
			absoluteUrl: absoluteUrl(req).origin,
			accessToken: config.auth.systemToken,
			method: Method.Patch,
		})
	}

	res.setHeader('Cache-Control', 's-maxage=60')
	return res.status(200).json({ ...game })
}
