/* eslint-disable camelcase */
import type { Game, IgdbGame, IgdbCompany, IgdbWebsite } from 'types'
import { GameWebsiteType, IgdbWebsiteCategory, IgdbGameStatus, GameStatus } from 'types'

import { sample } from 'lodash'

export const igdbImageUrl = 'https://images.igdb.com/igdb/image/upload'

const mapWebsites = (websites: Array<IgdbWebsite> | undefined) => {
	if (websites && websites.length > 0) {
		return websites.filter(({ category }) => {
			switch (category) {
				case IgdbWebsiteCategory.Android:
				case IgdbWebsiteCategory.Discord:
				case IgdbWebsiteCategory.EpicGames:
				case IgdbWebsiteCategory.GoG:
				case IgdbWebsiteCategory.iPad:
				case IgdbWebsiteCategory.iPhone:
				case IgdbWebsiteCategory.Official:
				case IgdbWebsiteCategory.Reddit:
				case IgdbWebsiteCategory.Steam:
				case IgdbWebsiteCategory.Twitter:
					return true
				default: return false
			}
		}).map(({ category, url }) => ({
			type: (() => {
				switch (category) {
					case IgdbWebsiteCategory.Android: return GameWebsiteType.GooglePlayStore
					case IgdbWebsiteCategory.Discord: return GameWebsiteType.Discord
					case IgdbWebsiteCategory.EpicGames: return GameWebsiteType.EpicGames
					case IgdbWebsiteCategory.GoG: return GameWebsiteType.GoG
					case IgdbWebsiteCategory.iPad:
					case IgdbWebsiteCategory.iPhone: return GameWebsiteType.AppStore
					case IgdbWebsiteCategory.Official: return GameWebsiteType.Official
					case IgdbWebsiteCategory.Reddit: return GameWebsiteType.Reddit
					case IgdbWebsiteCategory.Steam: return GameWebsiteType.Steam
					case IgdbWebsiteCategory.Twitter: return GameWebsiteType.Twitter
					default: return GameWebsiteType.Unknown
				}
			})(),
			url,
		}))
	}
	return []
}

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

	const { name, websites } = involvedCompany.company
	return ({ name, websites: mapWebsites(websites) })
}

export const mapIgdbGame = (game: IgdbGame): Game => {
	const {
		id, aggregated_rating: rating = null, aggregated_rating_count: ratingCount = null, genres, summary = null,
		involved_companies: companies, updated_at: updatedAt, name, platforms, first_release_date: releaseDate,
		release_dates: releaseDates, game_engines: engines, screenshots, cover, status, websites, hypes: hype, follows,
	} = game

	const screenshotUrls = screenshots?.length > 0
		? screenshots.map(({ image_id: imageId }) => `${igdbImageUrl}/t_screenshot_med/${imageId}.jpg`).filter(Boolean)
		: []

	return {
		id,
		name,
		cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : null,
		developer: resolveCompany(companies?.find(({ developer }) => developer) ?? null),
		engines: engines?.map(({ name }) => ({ name })) ?? null,
		genres: genres ? genres.map(({ name }) => name) : [],
		hype: ((hype !== null && hype !== undefined) && (follows !== null && follows !== undefined)) ? hype + follows : (hype ?? follows ?? 0),
		lastChecked: Date.now(),
		platforms: platforms?.map(({ abbreviation = null, name }) => ({ abbreviation, name })) ?? null,
		publisher: resolveCompany(companies?.find(({ publisher }) => publisher) ?? null),
		rating,
		ratingCount,
		releaseDate: releaseDate ?? null,
		releaseDates: releaseDates?.map(({ date, platform: { abbreviation = null, name } }) => ({
			date,
			platform: {
				abbreviation,
				name,
			},
		})) ?? null,
		screenshot: sample(screenshotUrls) ?? null,
		status: mapStatus(status),
		summary,
		updatedAt,
		websites: mapWebsites(websites),
	}
}
