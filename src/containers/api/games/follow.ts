import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { Options as DefaultOptions } from '../types'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'
import { monitorAsync, monitorReturnAsync } from '../performanceCheck'

type Options = {
	gameId: string,
} & DefaultOptions

export const follow = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { gameId, transaction } = options
	transaction.setName(`${method} - api/games/{gameId}/follow`)

	const { secret } = authenticate(req, res, { transaction })

	switch (method) {
		case 'GET': {
			const userData = await monitorReturnAsync(() => faunaClient(secret).query<{ data: { following: boolean } }>(
				q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.Identity()])),
			).then((response) => response.data), 'faunadb - Get()', transaction)
				.catch((error) => {
					if (error instanceof errors.NotFound) {
						return res.status(200).json({ following: false })
					} else throw error
				})
			return res.status(200).json({ ...userData })
		}
		case 'POST': {
			await monitorAsync(() => faunaClient(secret).query(
				q.Create(q.Collection('gamesUserData'), {
					data: {
						id: gameId,
						owner: q.Identity(),
						following: true,
					},
				}),
			), 'faunadb - Create()', transaction).catch(async (error) => {
				if (error.description.includes('unique') && error instanceof errors.BadRequest) {
					await monitorAsync(() => faunaClient(secret).query(
						q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.Identity()]))), {
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
