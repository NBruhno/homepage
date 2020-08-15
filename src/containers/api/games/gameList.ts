/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { getUnixTime, sub } from 'date-fns'
import { query as q } from 'faunadb'

import type { Game as IGDBGame } from 'types/IGDB'
import type { SimpleGame } from 'types/Games'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'
import { igdbFetcher, igdbImageUrl } from '../igdb'

const mapGames = (games: Array<IGDBGame>, followedGames: Array<string>) => {
	if (games.length > 0) {
		const mappedGames = games.map<SimpleGame>((game: IGDBGame) => {
			const following = followedGames?.includes(game.slug) ?? false
			return ({
				cover: game.cover?.image_id ? `${igdbImageUrl}/t_cover_small_2x/${game.cover.image_id}.jpg` : null,
				id: game.slug ?? null,
				name: game.name ?? null,
				releaseDate: game.first_release_date * 1000 ?? null,
				following,
			})
		})
		return mappedGames
	}

	return []
}

export const gameList = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	const token = authenticate(req, res, { optional: true })
	switch (method) {
		case 'POST': {
			const commonFields = 'fields name, release_dates, cover.image_id, first_release_date, slug;'
			let following = null as { data: Array<string> } | null
			let mappedGames = null as Array<SimpleGame>
			let mappedGamesFollowed = null as Array<SimpleGame>
			let mappedSearch = null as Array<SimpleGame>

			if (token) {
				following = await faunaClient(token.secret).query(
					q.Paginate(q.Match(q.Index('gamesByUser'), q.Identity())),
				)
			}

			const [gamesPopular, gamesFollowing, gamesSearch] = await Promise.all([
				igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: `${commonFields} sort first_release_date asc; limit 30; where first_release_date > ${getUnixTime(sub(Date.now(), { months: 2 }))} & hypes >= 0; sort hypes desc;`,
				}),
				following?.data?.length > 0 ? igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: `${commonFields} sort first_release_date asc; limit 100; where slug = ("${following?.data.join(`", "`)}");`,
				}) : [],
				body?.search ? igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: `${commonFields} limit 50; search "${body?.search}";`,
				}) : [],
			])

			mappedGames = mapGames(gamesPopular, following?.data)
			mappedGamesFollowed = mapGames(gamesFollowing, following?.data)
			mappedSearch = mapGames(gamesSearch, following?.data)

			res.status(200).json({ popular: mappedGames, following: mappedGamesFollowed, games: mappedSearch })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
