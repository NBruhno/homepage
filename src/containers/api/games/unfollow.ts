import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { FaunaGame } from 'types/Games'
import type { Options as DefaultOptions } from '../types'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'
import { monitorAsync, monitorReturnAsync } from '../performanceCheck'

type Options = {
	gameId: string,
} & DefaultOptions

export const unfollow = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { gameId, transaction } = options
	transaction.setName(`${method} - api/games/{gameId}/unfollow`)

	const { secret } = authenticate(req, res, { transaction })
	switch (method) {
		case 'PATCH': {
			await monitorReturnAsync(() => faunaClient(secret).query<FaunaGame>(
				q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesByIdAndOwner'), [gameId, q.Identity()]))), {
					data: {
						following: false,
					},
				}),
			), 'faunadb - Update()', transaction).then(async (game) => {
				if (!game.data.following) {
					await monitorAsync(() => faunaClient(secret).query(
						q.Delete(q.Select(['ref'], q.Get(q.Match(q.Index('gamesByIdAndOwner'), [gameId, q.Identity()])))),
					), 'faunadb - Delete()', transaction)
				}
			}).catch((error) => {
				if (error instanceof errors.NotFound) {
					const apiError = ApiError.fromCode(404)
					res.status(apiError.statusCode).json({ error: apiError.message })
					throw apiError
				} else throw error
			})

			res.status(200).json({ message: 'Successfully unfollowed the game' })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
