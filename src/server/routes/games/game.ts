/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'

import { Game } from 'types/Games'
import { Game as IGDBGame } from 'types/IGDB'

import { config } from 'config.server'

const root = [
	'id',
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
const companies = [
	'involved_companies.company.name',
	'involved_companies.company.slug',
	'involved_companies.company.description',
	'involved_companies.company.websites.category',
	'involved_companies.company.websites.trusted',
	'involved_companies.company.websites.url',
	'involved_companies.company.logo.image_id',
	'involved_companies.company.logo.alpha_channel',
]
const releaseDates = [
	'release_dates.date',
	'release_dates.platform.name',
	'release_dates.platform.platform_logo.image_id',
	'release_dates.platform.platform_logo.alpha_channel',
]
const platforms = [
	'platforms.abbreviation',
	'platforms.name',
	'platforms.platform_logo.image_id',
	'platforms.platform_logo.alpha_channel',
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

const fields = `fields ${[...root, ...cover, ...companies, ...releaseDates, ...platforms, ...engines, ...websites].join(', ')}`

export const game = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	const { method } = req
	switch (method) {
		case 'GET': {
			try {
				const response = await fetch('https://api-v3.igdb.com/games', {
					method: 'POST',
					body: `${fields}; where slug = "${id}";`,
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

				const transformedResult: Game[] = result.map(({ aggregated_rating, aggregated_rating_count, category, genres, storyline, summary, involved_companies, cover, name, platforms, first_release_date, release_dates, game_engines }: IGDBGame) => ({
					rating: aggregated_rating,
					ratingCount: aggregated_rating_count,
					category: category ?? null,
					companies: {
						...involved_companies,
					},
					cover: {
						...cover,
						url: cover?.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${cover.image_id}.jpg` : null,
					},
					engines: game_engines,
					genres,
					name,
					summary,
					storyline,
					platforms: platforms ?? null,
					releaseDate: first_release_date ?? null,
					releaseDates: release_dates ?? null,
				}))
				res.status(200).json(transformedResult[0])
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
