/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'

import { Game } from 'types/Games'
import { Game as IGDBGame } from 'types/IGDB'
import { authenticateAccessToken } from 'server/authenticateAccessToken'

import { config } from 'config.server'

export default async (req?: NextApiRequest, res?: NextApiResponse) => {
	const { method, body } = req
	switch (method) {
		case 'POST': {
			try {
				await authenticateAccessToken(req, res)
				const response = await fetch('https://api-v3.igdb.com/games', {
					method: 'POST',
					body: body?.search
						? `fields name, release_dates, cover.image_id, first_release_date, slug; limit 7; search "${body?.search}";`
						: 'fields name, release_dates, cover.image_id, first_release_date, slug; sort popularity desc; limit 7;',
					headers: new Headers({
						'user-key': config.igdb.userKey,
						'Content-Type': 'text/plain',
						accept: 'application/json',
					}),
				})
				const result = await response.json()

				if (result[0]?.status && result[0]?.status <= 400) {
					res.status(result[0]?.status).send(result[0])
					return
				}

				if (result.length > 0) {
					const transformedResult: Array<Game> = result.map((game: IGDBGame) => ({
						cover: {
							url: game.cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${game.cover.image_id}.jpg` : null,
						},
						id: game.slug ?? null,
						name: game.name,
						releaseDate: game.first_release_date ?? null,
					}))
					res.status(200).send(transformedResult)
				} else {
					res.status(200).send([])
				}
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
