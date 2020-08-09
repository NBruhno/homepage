/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { getUnixTime, sub } from 'date-fns'
import { query as q } from 'faunadb'

import type { Game as IGDBGame } from 'types/IGDB'
import type { SimpleGame } from 'types/Games'

import { authenticateAccessToken } from 'server/middleware'
import { igdbFetcher, igdbImageUrl } from 'server/igdb'
import { faunaClient } from 'server/faunaClient'
import { ApiError } from 'server/errors/ApiError'

const mapGames = (games: Array<IGDBGame>, followedGames: Array<string>) => {
	if (games.length > 0) {
		const mappedGames = games.map<SimpleGame>((game: IGDBGame) => {
			const following = followedGames?.includes(game.slug) ?? false
			return ({
				cover: game.cover?.image_id ? `${igdbImageUrl}/t_cover_small_2x/${game.cover.image_id}.jpg` : null,
				id: game.slug ?? null,
				name: game.name ?? null,
				releaseDate: game.first_release_date ?? null,
				following,
			})
		})
		return mappedGames
	}

	return []
}

export const gameList = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req

	const token = await authenticateAccessToken(req, res, { optional: true })
	switch (method) {
		case 'POST': {
			const commonFields = 'fields name, release_dates, cover.image_id, first_release_date, slug;'
			let followedGames = null as { data: Array<string> } | null
			let mappedGames = null as Array<SimpleGame>
			let mappedGamesFollowed = null as Array<SimpleGame>

			if (token) {
				followedGames = await faunaClient(token.secret).query(
					q.Paginate(q.Match(q.Index('gamesByUser'), q.Identity())),
				)
			}

			if (followedGames?.data?.length > 0) {
				const [games, gamesFollowing] = await Promise.all([
					await igdbFetcher<Array<IGDBGame>>('/games', res, {
						body: body?.search
							? `${commonFields} limit 50; search "${body?.search}";`
							: `${commonFields} sort first_release_date asc; limit 30; where first_release_date > ${getUnixTime(sub(Date.now(), { months: 2 }))} & hypes >= 0; sort hypes desc;`,
					}),
					await igdbFetcher<Array<IGDBGame>>('/games', res, {
						body: body?.searchFollowing
							? `${commonFields} limit 50; search "${body?.searchFollowing}"; where slug = ("${followedGames?.data.join(`", "`)}");`
							: `${commonFields} sort first_release_date asc; limit 100; where slug = ("${followedGames?.data.join(`", "`)}");`,
					}),
				])

				mappedGames = mapGames(games, followedGames?.data)
				mappedGamesFollowed = mapGames(gamesFollowing, followedGames?.data)
			} else {
				const games = await igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: body?.search
						? `${commonFields} limit 50; search "${body?.search}";`
						: `${commonFields} sort first_release_date asc; limit 30; where first_release_date > ${getUnixTime(sub(Date.now(), { months: 2 }))} & hypes >= 0; sort hypes desc;`,
				})
				mappedGames = mapGames(games, followedGames?.data)
				mappedGamesFollowed = []
			}

			res.status(200).json({ games: mappedGames, following: mappedGamesFollowed })
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
