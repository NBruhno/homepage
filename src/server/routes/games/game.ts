/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'
import { sample } from 'lodash-es'

import type { Game } from 'types/Games'
import type { Game as IGDBGame, Company } from 'types/IGDB'

import { authenticateAccessToken } from 'server/middleware'
import { ApiError } from 'server/errors/ApiError'
import { igdbFetcher, igdbImageUrl } from 'server/igdb'
import { faunaClient } from 'server/faunaClient'

const resolveCompany = (involvedCompany: Company) => {
	if (!involvedCompany) {
		return null
	}

	const { description, logo, name, slug, websites } = involvedCompany.company

	return ({
		description,
		logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null,
		name,
		slug,
		websites,
	})
}

const root = [
	'aggregated_rating_count',
	'aggregated_rating',
	'first_release_date',
	'id',
	'name',
	'slug',
	'storyline',
	'summary',
]

const cover = [
	'cover.alpha_channel',
	'cover.animated',
	'cover.image_id',
]

const screenshots = [
	'screenshots.alpha_channel',
	'screenshots.image_id',
	'screenshots.width',
]

const companies = [
	'involved_companies.company.description',
	'involved_companies.company.logo.alpha_channel',
	'involved_companies.company.logo.image_id',
	'involved_companies.company.name',
	'involved_companies.company.slug',
	'involved_companies.company.websites.category',
	'involved_companies.company.websites.trusted',
	'involved_companies.company.websites.url',
	'involved_companies.developer',
	'involved_companies.porting',
	'involved_companies.publisher',
	'involved_companies.supporting',
]

const releaseDates = [
	'release_dates.date',
	'release_dates.platform.abbreviation',
	'release_dates.platform.name',
	'release_dates.platform.platform_logo.alpha_channel',
	'release_dates.platform.platform_logo.image_id',
]

const genres = [
	'genres.name',
]

const platforms = [
	'platforms.abbreviation',
	'platforms.name',
	'platforms.platform_logo.image_id',
]

const engines = [
	'game_engines.description',
	'game_engines.logo.alpha_channel',
	'game_engines.logo.image_id',
	'game_engines.name',
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
			let igdbGame = null

			if (token) {
				await Promise.all([
					faunaClient(token.secret).query(
						q.Select(['data', 'id'], q.Get(q.Match(q.Index('gamesByIdAndUser'), [id, q.Identity()]))),
					).catch((error) => {
						if (error instanceof errors.NotFound) {
							return null
						} else {
							throw error
						}
					}),
					igdbFetcher<IGDBGame>('/games', res, { body: `${fields}; where slug = "${id}";`, single: true }),
				]).then(([faunaResponse, gameResponse]) => {
					followedGame = faunaResponse
					igdbGame = gameResponse
				})
			} else {
				igdbGame = await igdbFetcher<IGDBGame>('/games', res, { body: `${fields}; where slug = "${id}";`, single: true })
			}

			const { slug, aggregated_rating, aggregated_rating_count, genres, storyline, summary, involved_companies, cover, name, platforms, first_release_date, release_dates, game_engines, screenshots } = igdbGame
			const screenshotUrls = screenshots?.length > 0 ? screenshots.map(({ image_id }: { width: number, image_id: string }) => `${igdbImageUrl}/t_screenshot_big/${image_id}.jpg`).filter(Boolean) : []
			const transformedGame: Game = {
				name,
				summary,
				storyline,
				cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : null,
				developer: resolveCompany(involved_companies?.find(({ developer }) => developer)),
				engines: game_engines?.map(({ description, logo, name }) => ({
					description,
					logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null,
					name,
				})) ?? null,
				following: Boolean(followedGame),
				id: slug ?? null,
				porting: resolveCompany(involved_companies?.find(({ porting }) => porting)),
				publisher: resolveCompany(involved_companies?.find(({ publisher }) => publisher)),
				rating: aggregated_rating,
				ratingCount: aggregated_rating_count,
				screenshot: sample(screenshotUrls),
				supporting: resolveCompany(involved_companies?.find(({ supporting }) => supporting)),
				genres: genres ? genres.map(({ name }) => name) : [],
				platforms: platforms?.map(({ platform_logo, abbreviation, name }) => ({
					abbreviation,
					logo: platform_logo?.image_id ? `${igdbImageUrl}/t_thumb/${platform_logo.image_id}.jpg` : null,
					name,
				})) ?? null,
				releaseDate: first_release_date * 1000 ?? null,
				releaseDates: release_dates?.map(({ date, platform: { platform_logo, abbreviation, name } }) => ({
					date: date * 1000,
					platform: {
						abbreviation,
						logo: platform_logo?.image_id ? `${igdbImageUrl}/t_thumb/${platform_logo.image_id}.jpg` : null,
						name,
					},
				})) ?? null,
			}
			res.status(200).json(transformedGame)
			break
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
