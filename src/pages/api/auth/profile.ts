import { query } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'

import { faunaClient } from 'server/faunaClient'
import { authenticateAccessToken } from 'server/authenticateAccessToken'

const profile = async (req?: NextApiRequest, res?: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'GET': {
			try {
				const token = await authenticateAccessToken(req, res)

				const getProfile = async () => {
					const ref: { id: string } = await faunaClient(token.secret).query(query.Identity())
					return ref.id
				}

				res.status(200).json({ userId: await getProfile() })
			} catch (error) {
				console.error(error)
				res.status(500).json(error)
			}
			break
		}

		default: {
			res.status(405).end(`Invalid method ${method}`)
		}
	}
}

export default profile
