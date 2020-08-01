/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'

import type { Game as IGDBGame } from 'types/IGDB'
import type { SimpleGame } from 'types/Games'

import { authenticateAccessToken } from 'server/middleware'
import { igdbFetcher } from 'server/igdbFetcher'
import { faunaClient } from 'server/faunaClient'
import { ApiError } from 'server/errors/ApiError'

export const gameList = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	const token = await authenticateAccessToken(req, res, { optional: true })
	switch (method) {
		case 'POST': {
			let followedGames = null as { data: Array<string> } | null

			if (token) {
				followedGames = await faunaClient(token.secret).query(
					q.Paginate(q.Match(q.Index('gamesByUser'), q.Identity())),
				)
			}

			const commonFields = 'fields name, release_dates, cover.image_id, first_release_date, slug;'
			const games = await igdbFetcher<Array<IGDBGame>>('/games', res, {
				body: body?.search || !followedGames || followedGames?.data?.length === 0
					? `${commonFields} limit 20; ${body?.search ? `search "${body?.search}"` : 'sort popularity desc'};`
					: `${commonFields} sort first_release_date asc; limit 100; where slug = ("${followedGames?.data.join(`", "`)}");`,
			})

			if (games.length > 0) {
				const transformedResult: Array<SimpleGame> = games.map((game: IGDBGame) => {
					const following = followedGames ? Boolean(followedGames?.data.includes(game.slug)) : false
					return ({
						cover: game.cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${game.cover.image_id}.jpg` : null,
						id: game.slug ?? null,
						name: game.name,
						releaseDate: game.first_release_date ?? null,
						following,
					})
				})
				res.status(200).send(transformedResult)
			} else {
				res.status(200).send([])
			}
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
