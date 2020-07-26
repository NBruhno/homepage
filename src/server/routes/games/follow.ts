/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { authenticateAccessToken } from 'server/middleware'
import { faunaClient } from 'server/faunaClient'
import { ApiError } from 'server/errors/ApiError'

export const follow = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method } = req

	const token = await authenticateAccessToken(req, res)
	switch (method) {
		case 'POST': {
			await faunaClient(token.secret).query(
				q.Create(q.Collection('games'), {
					data: {
						id,
						userRefs: [q.Identity()],
					},
				}),
			).catch(async (error) => {
				if (error.description.includes('unique')) {
					await faunaClient(token.secret).query(q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), id))), {
						data: {
							userRefs: q.Append(q.Select(['data', 'userRefs'], q.Get(q.Match(q.Index('gamesById'), id))), [q.Identity()]),
						},
					}))
				} else {
					throw error
				}
			})

			res.status(200).json({ message: 'Success' })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
