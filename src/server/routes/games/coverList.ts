/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

import { ApiError } from 'server/errors/ApiError'
import { authenticateAccessToken } from 'server/middleware'

export const coverList = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	await authenticateAccessToken(req, res)
	switch (method) {
		case 'POST': {
			if (!body?.coverIds?.[0]) {
				const error = ApiError.fromCode(400)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			}
			const response = await fetch('https://api-v3.igdb.com/covers', {
				method: 'POST',
				body: `fields image_id; where id = (${body.coverIds.join(', ')});`,
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

			const transformedCovers = result.map(({ id, image_id: imageId }: { id: number, image_id: string }) => ({
				id,
				url: `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${imageId}.jpg`,
			}))
			res.status(200).json(transformedCovers)
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
