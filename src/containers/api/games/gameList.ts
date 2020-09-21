/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { getUnixTime, sub } from 'date-fns'
import { query as q } from 'faunadb'
import { Span } from '@sentry/apm'

import type { Game as IGDBGame } from 'types/IGDB'
import type { SimpleGame } from 'types/Games'
import type { Options } from '../types'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'
import { igdbFetcher, igdbImageUrl, mapStatus } from '../igdb'
import { monitorReturn, monitorReturnAsync } from '../performanceCheck'

const mapGames = (games: Array<IGDBGame>, followedGames: Array<string>, span: Span) => monitorReturn(() => {
	if (games.length > 0) {
		const mappedGames = games.map<SimpleGame>((game) => {
			const following = followedGames?.includes(game.slug) ?? false
			return ({
				cover: game.cover?.image_id ? `${igdbImageUrl}/t_cover_small_2x/${game.cover.image_id}.jpg` : null,
				id: game.slug ?? null,
				name: game.name ?? null,
				releaseDate: game.first_release_date * 1000 ?? null,
				status: mapStatus(game.status, span),
				following,
			})
		})
		return mappedGames
	}

	return []
}, 'mapGames()', span)

export const gameList = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method, body } = req
	const { transaction } = options

	const token = authenticate(req, res, { optional: true, transaction })
	switch (method) {
		case 'POST': {
			const commonFields = 'fields name, release_dates, cover.image_id, first_release_date, slug, status;'
			let following = [] as Array<string>

			if (token) {
				following = await monitorReturnAsync(() => faunaClient(token.secret).query<{ data: Array<[boolean, string]> }>(
					q.Paginate(q.Match(q.Index('gamesByOwner'), q.Identity())),
				), 'faunadb - Paginate()', transaction).then((games) => (
					monitorReturn(() => (
						games.data.map(([isFollowing, game]) => isFollowing ? game : null).filter(Boolean)
					), 'games.data.map()', transaction)
				))
			}

			const [gamesPopular, gamesFollowing, gamesSearch] = await monitorReturnAsync((span) => Promise.all([
				monitorReturnAsync(() => igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: `${commonFields} sort first_release_date asc; limit 30; where first_release_date > ${getUnixTime(sub(Date.now(), { months: 2 }))} & hypes >= 0; sort hypes desc;`,
				}), 'igdbFetcher() /games - popular', span),
				following?.length > 0 ? monitorReturnAsync(() => igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: `${commonFields} sort first_release_date asc; limit 100; where slug = ("${following.join(`", "`)}");`,
				}), 'igdbFetcher() /games - following', span) : [],
				body?.search ? monitorReturnAsync(() => igdbFetcher<Array<IGDBGame>>('/games', res, {
					body: `${commonFields} limit 50; search "${body?.search}";`,
				}), 'igdbFetcher() /games - search', span) : [],
			]).then((result) => result.map((games) => mapGames(games, following, transaction))), 'Promise.all()', transaction)

			return res.status(200).json({ popular: gamesPopular, following: gamesFollowing, games: gamesSearch })
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
