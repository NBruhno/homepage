import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import type { FaunaGame } from 'types/Games'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'

export const unfollow = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method } = req

	const { secret } = authenticate(req, res)
	switch (method) {
		case 'PATCH': {
			await faunaClient(secret).query<FaunaGame>(q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesByIdAndOwner'), [id, q.Identity()]))), {
				data: {
					following: false,
				},
			})).then(async (game) => {
				if (!game.data.following) {
					await faunaClient(secret).query(q.Delete(q.Select(['ref'], q.Get(q.Match(q.Index('gamesByIdAndOwner'), [id, q.Identity()])))))
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
