import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'

export const follow = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method } = req

	const { secret } = authenticate(req, res)
	switch (method) {
		case 'POST': {
			await faunaClient(secret).query(
				q.Create(q.Collection('games'), {
					data: {
						id,
						owner: q.Identity(),
						following: true,
					},
				}),
			).catch(async (error) => {
				if (error.description.includes('unique') && error instanceof errors.BadRequest) {
					await faunaClient(secret).query(
						q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesByIdAndOwner'), [id, q.Identity()]))), {
							data: {
								following: true,
							},
						}),
					)
				} else {
					throw error
				}
			})

			res.status(200).json({ message: 'Successfully followed the game' })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
