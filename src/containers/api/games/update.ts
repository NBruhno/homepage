import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import type { Game } from 'types/Games'
import type { Game as IGDBGame } from 'types/IGDB'
import type { Options as DefaultOptions } from '../types'

import { igdbFetcher, fields, mapIgdbGame } from './lib'

import { authenticateSystem } from '../middleware'
import { monitorAsync } from '../performanceCheck'
import { serverClient } from '../faunaClient'

type Options = {
	gameId: string,
} & DefaultOptions

export const update = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { body }: { body: Game } = req
	const { gameId, transaction } = options
	authenticateSystem(req, res)

	const game = body ?? await igdbFetcher<IGDBGame>('/games', res, {
		body: `${fields}; where slug = "${gameId}";`,
		single: true,
		span: transaction,
	}).then(mapIgdbGame)

	await monitorAsync(() => serverClient.query(q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), gameId))), {
		data: {
			...game,
			lastChecked: Date.now(),
		},
	})), 'faunadb - Update()', transaction)

	return res.status(200).json({ message: `${gameId} created` })
}
