import { query } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'

import { faunaClient } from 'server/faunaClient'
import { authenticateAccessToken } from 'server/middleware'

const profile = async (req?: NextApiRequest, res?: NextApiResponse) => {
	const { method } = req
	const token = await authenticateAccessToken(req, res)

	switch (method) {
		case 'GET': {
			try {
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
			console.log(res.status)
			res.status(405).end(`Invalid method ${method}`)
		}
	}
}

export default profile
