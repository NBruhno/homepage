import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'

export const involved = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method, body } = req

	switch (method) {
		case 'POST': {
			try {
				const response = await fetch('https://api-v3.igdb.com/involved_companies', {
					method: 'POST',
					body: `fields image_id; where id = ${id};`,
					headers: new Headers({
						'user-key': config.igdb.userKey,
						'Content-Type': 'text/plain',
						accept: 'application/json',
					}),
				})
				const game = await response.json()
				const finalUrl = { url: `https://images.igdb.com/igdb/image/upload/t_cover_${body.size}/${game[0].image_id}.jpg` }
				res.status(200).json(finalUrl)
			} catch (error) {
				console.error(error)
				res.status(500).json(error)
			}
			break
		}

		default: res.status(405).end()
	}
}