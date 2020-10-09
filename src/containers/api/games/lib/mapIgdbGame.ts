/* eslint-disable camelcase */
import { sample } from 'lodash-es'

import { GameStatus, Game as IgdbGame, Company } from 'types/IGDB'
import { Status, Game } from 'types/Games'

export const igdbImageUrl = 'https://images.igdb.com/igdb/image/upload'

export const mapStatus = (status: GameStatus): Status | null => {
	switch (status) {
		case GameStatus.Released: return Status.Released
		case GameStatus.Alpha: return Status.Alpha
		case GameStatus.Beta: return Status.Beta
		case GameStatus.EarlyAccess: return Status.EarlyAccess
		case GameStatus.Offline: return Status.Offline
		case GameStatus.Rumored: return Status.Rumored
		default: return null
	}
}

const resolveCompany = (involvedCompany: Company) => {
	if (!involvedCompany) return null

	const { description, logo, name, slug, websites } = involvedCompany.company
	return ({ description, name, slug, websites, logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null })
}

export const mapIgdbGame = (game: IgdbGame): Game => {
	const {
		id: igdbId, slug, aggregated_rating: rating, aggregated_rating_count: ratingCount, genres, storyline, summary,
		involved_companies: companies, updated_at: updatedAt, name, platforms, first_release_date: releaseDate,
		release_dates: releaseDates, game_engines: engines, screenshots, cover, status, websites, hypes: hype,
	} = game

	const screenshotUrls = screenshots?.length > 0
		? screenshots.map(({ image_id: imageId }: { width: number, image_id: string }) => `${igdbImageUrl}/t_screenshot_med/${imageId}.jpg`).filter(Boolean)
		: []

	return {
		id: slug ?? null,
		name,
		cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : null,
		developer: resolveCompany(companies?.find(({ developer }) => developer)),
		engines: engines?.map(({ description, logo, name }) => ({
			description,
			logo: logo?.image_id ? `${igdbImageUrl}/t_thumb/${logo.image_id}.jpg` : null,
			name,
		})) ?? null,
		genres: genres ? genres.map(({ name }) => name) : [],
		hype,
		igdbId,
		lastChecked: Date.now(),
		platforms: platforms?.map(({ platform_logo: platformLogo, abbreviation, name }) => ({
			abbreviation,
			logo: platformLogo?.image_id ? `${igdbImageUrl}/t_thumb/${platformLogo.image_id}.jpg` : null,
			name,
		})) ?? null,
		porting: resolveCompany(companies?.find(({ porting }) => porting)),
		publisher: resolveCompany(companies?.find(({ publisher }) => publisher)),
		rating,
		ratingCount,
		releaseDate: releaseDate * 1000 ?? null,
		releaseDates: releaseDates?.map(({ date, platform: { platform_logo: platformLogo, abbreviation, name } }) => ({
			date: date * 1000,
			platform: {
				abbreviation,
				logo: platformLogo?.image_id ? `${igdbImageUrl}/t_thumb/${platformLogo.image_id}.jpg` : null,
				name,
			},
		})) ?? null,
		screenshot: sample(screenshotUrls),
		status: mapStatus(status),
		storyline,
		summary,
		supporting: resolveCompany(companies?.find(({ supporting }) => supporting)),
		updatedAt,
		websites: websites?.length > 0
			? websites.map(({ category, trusted, url }) => ({ category, trusted, url }))
			: [],
	}
}