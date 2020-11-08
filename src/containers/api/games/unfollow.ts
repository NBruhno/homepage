import { query as q, errors } from 'faunadb'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { FaunaGame } from 'types/Games'

import { sendError } from '../errors/ApiError'
import { faunaClient } from '../faunaClient'
import { authenticate } from '../middleware'
import { monitorAsync, monitorReturnAsync } from '../performanceCheck'
import type { Options as DefaultOptions } from '../types'

type Options = {
	gameId: number,
} & DefaultOptions

export const unfollow = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { gameId, transaction } = options
	transaction.setName(`${method} - api/games/{gameId}/unfollow`)

	const { secret } = authenticate(req, res, { transaction })
	switch (method) {
		case 'PATCH': {
			await monitorReturnAsync(() => faunaClient(secret).query<FaunaGame>(
				q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.Identity()]))), {
					data: {
						following: false,
					},
				}),
			), 'faunadb - Update()', transaction).then(async (game) => {
				if (!game.data.following) {
					await monitorAsync(() => faunaClient(secret).query(
						q.Delete(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.Identity()])))),
					), 'faunadb - Delete()', transaction)
				}
			}).catch((error) => {
				if (error instanceof errors.NotFound) sendError(404, res)
				throw error
			})

			res.status(200).json({ message: 'Successfully unfollowed the game' })
			break
		}

		default: sendError(405, res)
	}
}
