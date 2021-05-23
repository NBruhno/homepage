import type { Options as DefaultOptions } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Game } from 'types/Games'
import type { Game as IGDBGame } from 'types/IGDB'

import { getUnixTime } from 'date-fns'
import { query as q } from 'faunadb'

import { serverClient } from '../faunaClient'
import { authenticateSystem } from '../middleware'
import { monitorAsync } from '../performanceCheck'

import { igdbFetcher, fields, mapIgdbGame } from './lib'

type Options = {
	gameId: number,
} & DefaultOptions

export const update = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { body }: { body: Game } = req
	const { gameId, transaction } = options
	authenticateSystem(req, res)

	const game = body ?? await igdbFetcher<IGDBGame>('/games', res, {
		body: `${fields}; where id = ${gameId};`,
		single: true,
		span: transaction,
	}).then(mapIgdbGame)

	await monitorAsync(() => serverClient(transaction).query(q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), gameId))), {
		data: {
			...game,
			lastChecked: getUnixTime(new Date()),
		},
	})), 'faunadb - Update()', transaction)

	return res.status(200).json({ message: `${gameId} created` })
}
