/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'
import { sample } from 'lodash-es'

import { config } from 'config.server'

import { Game } from 'types/Games'
import { Game as IGDBGame } from 'types/IGDB'

import { authenticateAccessToken } from 'server/middleware'
import { ApiError } from 'server/errors/ApiError'
import { faunaClient } from 'server/faunaClient'

const root = [
	'id',
	'slug',
	'name',
	'first_release_date',
	'storyline',
	'summary',
	'aggregated_rating',
	'aggregated_rating_count',
]

const cover = [
	'cover.image_id',
	'cover.alpha_channel',
	'cover.animated',
]

const screenshots = [
	'screenshots.alpha_channel',
	'screenshots.image_id',
	'screenshots.width',
]

const companies = [
	'involved_companies.company.description',
	'involved_companies.developer',
	'involved_companies.company.logo.alpha_channel',
	'involved_companies.company.logo.image_id',
	'involved_companies.company.name',
	'involved_companies.porting',
	'involved_companies.publisher',
	'involved_companies.company.slug',
	'involved_companies.supporting',
	'involved_companies.company.websites.category',
	'involved_companies.company.websites.trusted',
	'involved_companies.company.websites.url',
]

const releaseDates = [
	'release_dates.date',
	'release_dates.platform.name',
	'release_dates.platform.platform_logo.image_id',
	'release_dates.platform.platform_logo.alpha_channel',
]

const genres = [
	'genres.name',
]

const platforms = [
	'platforms.abbreviation',
	'platforms.name',
	'platforms.platform_logo.image_id',
	'platforms.platform_logo.alpha_channel',
	'platforms.platform_logo.url',
]

const engines = [
	'game_engines.description',
	'game_engines.name',
	'game_engines.logo.image_id',
	'game_engines.logo.alpha_channel',
]

const websites = [
	'websites.category',
	'websites.trusted',
	'websites.url',
]

const fields = `fields ${[...root, ...cover, ...screenshots, ...companies, ...releaseDates, ...genres, ...platforms, ...engines, ...websites].join(', ')}`

export const game = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method } = req

	const token = await authenticateAccessToken(req, res, { optional: true })
	switch (method) {
		case 'GET': {
			let followedGame = null as { data: Array<string> } | null

			if (token) {
				followedGame = await faunaClient(token.secret).query(
					q.Select(['data', 'id'], q.Get(q.Match(q.Index('gamesByIdAndUser'), [id, q.Identity()]))),
				).catch((error: errors.FaunaError) => {
					if (error instanceof errors.NotFound) {
						return null
					} else {
						throw error
					}
				})
			}

			const response = await fetch('https://api-v3.igdb.com/games', {
				method: 'POST',
				body: `${fields}, screenshots; where slug = "${id}";`,
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

			const screenshots = result[0].screenshots?.length > 0 ? result[0].screenshots.map(({ image_id }: { width: number, image_id: string }) => `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${image_id}.jpg`).filter(Boolean) : []
			const transformedResult: Game[] = result.map(({ slug, aggregated_rating, aggregated_rating_count, category, genres, storyline, summary, involved_companies, cover, name, platforms, first_release_date, release_dates, game_engines }: IGDBGame) => ({
				id: slug ?? null,
				rating: aggregated_rating,
				ratingCount: aggregated_rating_count,
				category: category ?? null,
				developer: involved_companies.find(({ developer }) => developer),
				supporting: involved_companies.find(({ supporting }) => supporting),
				publisher: involved_companies.find(({ publisher }) => publisher),
				porting: involved_companies.find(({ porting }) => porting),
				companies: { ...involved_companies },
				cover: { ...cover, url: cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg` : null },
				screenshot: sample(screenshots),
				engines: game_engines,
				following: Boolean(followedGame),
				genres: genres ? genres.map(({ name }) => name) : [],
				name,
				summary,
				storyline,
				platforms: platforms ? platforms.map(({ name }) => name) : null,
				releaseDate: first_release_date ?? null,
				releaseDates: release_dates ?? null,
			}))
			res.status(200).json(transformedResult[0])
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
