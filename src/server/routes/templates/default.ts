import { NextApiRequest, NextApiResponse } from 'next'

import { ApiError } from 'server/errors/ApiError'

export const defaultApi = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'POST': {
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
