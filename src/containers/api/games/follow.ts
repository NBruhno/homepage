import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { Options as DefaultOptions } from '../types'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'
import { monitorAsync } from '../performanceCheck'

type Options = {
	gameId: string,
} & DefaultOptions

export const follow = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { gameId, transaction } = options
	transaction.setName(`${method} - api/games/{gameId}/follow`)

	const { secret } = authenticate(req, res, { transaction })

	switch (method) {
		case 'POST': {
			await monitorAsync(() => faunaClient(secret).query(
				q.Create(q.Collection('games'), {
					data: {
						id: gameId,
						owner: q.Identity(),
						following: true,
					},
				}),
			), 'faunadb - Create()', transaction).catch(async (error) => {
				if (error.description.includes('unique') && error instanceof errors.BadRequest) {
					await monitorAsync(() => faunaClient(secret).query(
						q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesByIdAndOwner'), [gameId, q.Identity()]))), {
							data: {
								following: true,
							},
						}),
					), 'faunadb - Update()', transaction)
				} else throw error
			})

			return res.status(200).json({ message: 'Successfully followed the game' })
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
