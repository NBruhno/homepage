import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, Game, IgdbGame } from 'types'

import { getUnixTime } from 'date-fns'
import { query as q } from 'faunadb'

import { monitorAsync } from 'lib/sentryMonitor'

import { authenticateSystem } from 'api/middleware'
import { serverClient, igdbFetcher, gameFields, mapIgdbGame } from 'api/utils'

type Options = {
	gameId: number,
} & ApiOptions

export const update = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { body }: { body: Game } = req
	const { gameId, transaction } = options
	authenticateSystem(req, res)

	const game = body ?? await igdbFetcher<IgdbGame>('/games', res, {
		body: `${gameFields}; where id = ${gameId};`,
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
