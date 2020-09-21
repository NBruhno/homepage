/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import { query as q, errors } from 'faunadb'
import { sample } from 'lodash-es'
import { Span } from '@sentry/apm'

import type { Game } from 'types/Games'
import type { Game as IGDBGame, Company } from 'types/IGDB'
import type { Options as DefaultOptions } from '../types'

import { ApiError } from '../errors/ApiError'
import { authenticate } from '../middleware'
import { faunaClient } from '../faunaClient'
import { igdbFetcher, igdbImageUrl, mapStatus } from '../igdb'
import { monitorReturnAsync, monitorReturn } from '../performanceCheck'

const resolveCompany = (involvedCompany: Company, span: Span) => monitorReturn(() => {
	if (!involvedCompany) return null

	const { description, logo, name, slug, websites } = involvedCompany.company
	return ({ description, name, slug, websites, logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null })
}, 'resolveCompany()', span)

const root = [
	'aggregated_rating_count', 'aggregated_rating', 'first_release_date',
	'id', 'name', 'slug', 'storyline', 'summary', 'status',
]
const companies = [
	'involved_companies.company.description', 'involved_companies.company.logo.alpha_channel', 'involved_companies.company.logo.image_id',
	'involved_companies.company.name', 'involved_companies.company.slug', 'involved_companies.company.websites.category',
	'involved_companies.company.websites.trusted', 'involved_companies.company.websites.url', 'involved_companies.developer',
	'involved_companies.porting', 'involved_companies.publisher', 'involved_companies.supporting',
]
const releaseDates = [
	'release_dates.date', 'release_dates.platform.abbreviation', 'release_dates.platform.name',
	'release_dates.platform.platform_logo.alpha_channel', 'release_dates.platform.platform_logo.image_id',
]
const cover = ['cover.alpha_channel', 'cover.animated', 'cover.image_id']
const genres = ['genres.name']
const platforms = ['platforms.abbreviation', 'platforms.name', 'platforms.platform_logo.image_id']
const engines = ['game_engines.description', 'game_engines.logo.alpha_channel', 'game_engines.logo.image_id', 'game_engines.name']
const websites = ['websites.category', 'websites.trusted', 'websites.url']
const screenshots = ['screenshots.alpha_channel', 'screenshots.image_id', 'screenshots.width']

const fields = `fields ${[...root, ...cover, ...screenshots, ...companies, ...releaseDates, ...genres, ...platforms, ...engines, ...websites].join(', ')}`

type Options = {
	gameId: string,
} & DefaultOptions

export const game = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { gameId, transaction } = options
	transaction.setName(`${method} - api/games/{gameId}`)

	const token = authenticate(req, res, { optional: true, transaction })
	switch (method) {
		case 'GET': {
			let followedGame = null as { data: Array<string> } | null
			let igdbGame = null as IGDBGame

			if (token) {
				[followedGame, igdbGame] = await monitorReturnAsync((span) => Promise.all([
					monitorReturnAsync(() => faunaClient(token.secret).query(
						q.Select(['data', 'id'], q.Get(q.Match(q.Index('gamesByIdAndOwner'), [gameId, q.Identity()]))),
					).catch((error) => {
						if (error instanceof errors.NotFound) {
							return null
						} else {
							throw error
						}
					}), 'faunadb - Get()', span),
					monitorReturnAsync(() => igdbFetcher<IGDBGame>('/games', res, {
						body: `${fields}; where slug = "${gameId}";`,
						single: true,
					}), 'igdbFetcher() - /games', span),
				]), 'Promise.all()', transaction)
			} else {
				igdbGame = await monitorReturnAsync(() => igdbFetcher<IGDBGame>('/games', res, {
					body: `${fields}; where slug = "${gameId}";`,
					single: true,
				}), 'igdbFetcher() - /games', transaction)
			}

			const {
				slug, aggregated_rating, aggregated_rating_count, genres, storyline, summary, involved_companies,
				name, platforms, first_release_date, release_dates, game_engines, screenshots, cover, status, websites,
			} = igdbGame

			const screenshotUrls = screenshots?.length > 0
				? screenshots.map(({ image_id }: { width: number, image_id: string }) => `${igdbImageUrl}/t_screenshot_med/${image_id}.jpg`).filter(Boolean)
				: []

			const transformedGame: Game = monitorReturn((span) => ({
				name,
				summary,
				storyline,
				cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : null,
				developer: resolveCompany(involved_companies?.find(({ developer }) => developer), span),
				engines: monitorReturn(() => (
					game_engines?.map(({ description, logo, name }) => ({
						description,
						logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null,
						name,
					})) ?? null
				), 'game_engines()', span),
				following: Boolean(followedGame),
				id: slug ?? null,
				porting: resolveCompany(involved_companies?.find(({ porting }) => porting), span),
				publisher: resolveCompany(involved_companies?.find(({ publisher }) => publisher), span),
				rating: aggregated_rating,
				ratingCount: aggregated_rating_count,
				screenshot: monitorReturn(() => sample(screenshotUrls), 'sample()', span),
				status: mapStatus(status, span),
				supporting: resolveCompany(involved_companies?.find(({ supporting }) => supporting), span),
				genres: genres ? monitorReturn(() => genres.map(({ name }) => name), 'genres.map()', span) : [],
				platforms: monitorReturn(() => (
					platforms?.map(({ platform_logo, abbreviation, name }) => ({
						abbreviation,
						logo: platform_logo?.image_id ? `${igdbImageUrl}/t_thumb/${platform_logo.image_id}.jpg` : null,
						name,
					})) ?? null
				), 'platforms.map()', span),
				releaseDate: first_release_date * 1000 ?? null,
				websites: monitorReturn(() => (
					websites.map(({ category, trusted, url }) => ({ category, trusted, url }))
				), 'websites.map()', span),
				releaseDates: monitorReturn(() => (release_dates?.map(({ date, platform: { platform_logo, abbreviation, name } }) => ({
					date: date * 1000,
					platform: {
						abbreviation,
						logo: platform_logo?.image_id ? `${igdbImageUrl}/t_thumb/${platform_logo.image_id}.jpg` : null,
						name,
					},
				})) ?? null), 'release_dates.map()', span),
			}), 'transformedGame', transaction)

			return res.status(200).json(transformedGame)
		}

		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}
