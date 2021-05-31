import type { Options as DefaultOptions } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { FaunaGame } from 'types/Games'

import { query as q, errors } from 'faunadb'

import { createAndAttachError } from '../errors/ApiError'
import { faunaClient } from '../faunaClient'
import { authenticate } from '../middleware'
import { monitorAsync, monitorReturnAsync } from '../performanceCheck'

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
			await monitorReturnAsync(() => faunaClient(secret, transaction).query<FaunaGame>(
				q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.CurrentIdentity()]))), {
					data: {
						following: false,
					},
				}),
			), 'faunadb - Update()', transaction).then(async (game) => {
				if (!game.data.following) {
					await monitorAsync(() => faunaClient(secret, transaction).query(
						q.Delete(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.CurrentIdentity()])))),
					), 'faunadb - Delete()', transaction)
				}
			}).catch((error) => {
				if (error instanceof errors.NotFound) throw createAndAttachError(404, res, error.message)
			})

			res.status(200).json({ message: 'Successfully unfollowed the game' })
			break
		}

		default: throw createAndAttachError(405, res)
	}
}
