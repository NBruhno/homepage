/* eslint-disable camelcase */
import type { Game, IgdbGame, IgdbCompany } from 'types'

import { sample } from 'lodash'
import { IgdbGameStatus, GameStatus } from 'types'

export const igdbImageUrl = 'https://images.igdb.com/igdb/image/upload'

export const mapStatus = (status: IgdbGameStatus): GameStatus | null => {
	switch (status) {
		case IgdbGameStatus.Released: return GameStatus.Released
		case IgdbGameStatus.Alpha: return GameStatus.Alpha
		case IgdbGameStatus.Beta: return GameStatus.Beta
		case IgdbGameStatus.EarlyAccess: return GameStatus.EarlyAccess
		case IgdbGameStatus.Offline: return GameStatus.Offline
		case IgdbGameStatus.Rumored: return GameStatus.Rumored
		default: return null
	}
}

const resolveCompany = (involvedCompany: IgdbCompany | null) => {
	if (!involvedCompany) return null

	const { description, logo, name, slug, websites } = involvedCompany.company
	return ({ description, name, slug, websites, logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null })
}

export const mapIgdbGame = (game: IgdbGame): Game => {
	const {
		id, aggregated_rating: rating = null, aggregated_rating_count: ratingCount = null, genres, storyline = null, summary = null,
		involved_companies: companies, updated_at: updatedAt, name, platforms, first_release_date: releaseDate,
		release_dates: releaseDates, game_engines: engines, screenshots, cover, status, websites, hypes: hype, follows,
	} = game

	const screenshotUrls = screenshots?.length > 0
		? screenshots.map(({ image_id: imageId }: { width: number, image_id: string }) => `${igdbImageUrl}/t_screenshot_med/${imageId}.jpg`).filter(Boolean)
		: []

	return {
		id,
		name,
		cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : null,
		developer: resolveCompany(companies?.find(({ developer }) => developer) ?? null),
		engines: engines?.map(({ description = null, logo, name }) => ({
			description,
			logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null,
			name,
		})) ?? null,
		genres: genres ? genres.map(({ name }) => name) : [],
		hype: ((hype !== null && hype !== undefined) && (follows !== null && follows !== undefined)) ? hype + follows : (hype ?? follows ?? 0),
		lastChecked: Date.now(),
		platforms: platforms?.map(({ platform_logo: platformLogo, abbreviation = null, name }) => ({
			abbreviation,
			logo: platformLogo?.image_id ? `${igdbImageUrl}/t_thumb/${platformLogo.image_id}.jpg` : null,
			name,
		})) ?? null,
		porting: resolveCompany(companies?.find(({ porting }) => porting) ?? null),
		publisher: resolveCompany(companies?.find(({ publisher }) => publisher) ?? null),
		rating,
		ratingCount,
		releaseDate: releaseDate ?? null,
		releaseDates: releaseDates?.map(({ date, platform: { platform_logo: platformLogo, abbreviation = null, name } }) => ({
			date,
			platform: {
				abbreviation,
				logo: platformLogo?.image_id ? `${igdbImageUrl}/t_thumb/${platformLogo.image_id}.jpg` : null,
				name,
			},
		})) ?? null,
		screenshot: sample(screenshotUrls) ?? null,
		status: mapStatus(status),
		storyline,
		summary,
		supporting: resolveCompany(companies?.find(({ supporting }) => supporting) ?? null),
		updatedAt,
		websites: websites && websites?.length > 0
			? websites.map(({ category, trusted, url }) => ({ category, trusted, url }))
			: [],
	}
}
