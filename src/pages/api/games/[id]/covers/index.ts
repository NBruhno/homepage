/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

export default async (req?: NextApiRequest, res?: NextApiResponse) => {
	const { method, body } = req
	switch (method) {
		case 'POST': {
			if (!body?.coverIds?.[0]) {
				res.status(400).end()
				break
			}
			try {
				const response = await fetch('https://api-v3.igdb.com/covers', {
					method: 'POST',
					body: `fields image_id; where id = (${body.coverIds.join(', ')});`,
					headers: new Headers({
						'user-key': config.igdb.userKey,
						'Content-Type': 'text/plain',
						accept: 'application/json',
					}),
				})
				const covers = await response.json()
				if (covers[0]?.status && covers[0]?.status <= 400) {
					res.status(covers[0]?.status).send(covers[0])
				}

				const transformedCovers = covers.map(({ id, image_id: imageId }: { id: number, image_id: string }) => ({
					id,
					url: `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${imageId}.jpg`,
				}))
				res.status(200).json(transformedCovers)
			} catch (error) {
				console.error(error)
				res.status(500).json(error)
			}
			break
		}

		default: {
			res.status(405).end(`Method ${method}`)
		}
	}
}
