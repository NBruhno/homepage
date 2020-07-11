import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'
import { ApiError } from 'server/errors/ApiError'

export const cover = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method, body } = req

	switch (method) {
		case 'POST': {
			if (!body || (!body?.size?.includes('small') && !body?.size?.includes('big'))) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}
			const response = await fetch('https://api-v3.igdb.com/covers', {
				method: 'POST',
				body: `fields image_id; where id = ${id};`,
				headers: new Headers({
					'user-key': config.igdb.userKey,
					'Content-Type': 'text/plain',
					accept: 'application/json',
				}),
			})
			const result = await response.json()
			if (result[0]?.status && result[0]?.status <= 400) {
				const error = ApiError.fromCode(result[0]?.status)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}

			const finalUrl = { url: `https://images.igdb.com/igdb/image/upload/t_cover_${body.size}/${result[0].image_id}_2x.jpg` }
			res.status(200).json(finalUrl)
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
