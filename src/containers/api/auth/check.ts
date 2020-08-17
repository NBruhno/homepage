import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'

import { ApiError } from '../errors/ApiError'
import { serverClient } from '../faunaClient'

export const check = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body: { email } } = req

	switch (method) {
		case 'POST': {
			if (!email) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const user = await serverClient.query(
				q.Get(q.Match(q.Index('usersByEmail'), email)),
			).catch((error) => {
				if (!(error instanceof errors.NotFound)) {
					throw error
				}
			})

			res.status(200).json({ userExists: Boolean(user) })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
