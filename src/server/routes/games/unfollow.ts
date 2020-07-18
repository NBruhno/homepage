/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import { authenticateAccessToken } from 'server/middleware'
import { faunaClient } from 'server/faunaClient'
import { ApiError } from 'server/errors/ApiError'

export const unfollow = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method } = req

	const token = await authenticateAccessToken(req, res)
	switch (method) {
		case 'POST': {
			await faunaClient(token.secret).query(q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesById'), id))), {
				data: {
					userRefs: q.Filter(
						q.Select(['data', 'userRefs'], q.Get(q.Match(q.Index('gamesById'), id))),
						q.Lambda('ref', q.Not(q.Equals(q.Var('ref'), q.Identity()))),
					),
				},
			}))

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
