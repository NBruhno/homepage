import type { IgdbGame, IgdbCompany, IgdbWebsite, IgdbMultiplayerMode } from 'types'
import { GameWebsiteType, IgdbWebsiteCategory, IgdbStatus, IgdbCategory, GameStatus, GameCategory } from 'types'

import { fromUnixTime } from 'date-fns'
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
				case IgdbWebsiteCategory.Ipad:
				case IgdbWebsiteCategory.Iphone:
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
					case IgdbWebsiteCategory.Ipad:
					case IgdbWebsiteCategory.Iphone: return GameWebsiteType.AppStore
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
	return undefined
}

export const mapStatus = (status: IgdbStatus): GameStatus | undefined => {
	switch (status) {
		case IgdbStatus.Released: return GameStatus.Released
		case IgdbStatus.Alpha: return GameStatus.Alpha
		case IgdbStatus.Beta: return GameStatus.Beta
		case IgdbStatus.EarlyAccess: return GameStatus.EarlyAccess
		case IgdbStatus.Offline: return GameStatus.Offline
		case IgdbStatus.Cancelled: return GameStatus.Cancelled
		case IgdbStatus.Rumored: return GameStatus.Rumored
		case IgdbStatus.Delisted: return GameStatus.Delisted
		default: return undefined
	}
}

const mapCategory = (category: IgdbCategory): GameCategory | undefined => {
	switch (category) {
		case IgdbCategory.MainGame: return GameCategory.MainGame
		case IgdbCategory.DlcAddon: return GameCategory.DLCAddon
		case IgdbCategory.Expansion: return GameCategory.Expansion
		case IgdbCategory.Bundle: return GameCategory.Bundle
		case IgdbCategory.StandaloneExpansion: return GameCategory.StandaloneExpansion
		case IgdbCategory.Mod: return GameCategory.Mod
		case IgdbCategory.Episode: return GameCategory.Episode
		case IgdbCategory.Season: return GameCategory.Season
		case IgdbCategory.Remake: return GameCategory.Remake
		case IgdbCategory.Remaster: return GameCategory.Remaster
		case IgdbCategory.ExpandedGame: return GameCategory.ExpandedGame
		case IgdbCategory.Port: return GameCategory.Port
		case IgdbCategory.Fork: return GameCategory.Fork
		default: return undefined
	}
}

const mapCompanies = (involvedCompanies: Array<IgdbCompany> | undefined, type: 'developer' | 'porting' | 'publisher' | 'supporting') => {
	if (!involvedCompanies || involvedCompanies.length <= 0) return undefined

	return involvedCompanies.filter((company) => company[type]).map(({ company }) => ({
		id: company.id,
		name: company.name,
		websites: mapWebsites(company.websites),
	}))
}

const mapMultiplayerMode = (multiplayerModes: Array<IgdbMultiplayerMode>) => multiplayerModes.map(({
	campaigncoop: hasCampaignCoop, dropin: hasDropIn, lancoop: hasLanCoop, offlinecoop: hasOfflineCoop, offlinecoopmax, offlinemax,
	onlinecoop: hasOnlineCoop, onlinecoopmax, onlinemax, splitscreen: hasSplitScreen, splitscreenonline: hasOnlineSplitScreen, platform,
}) => ({
	hasCampaignCoop,
	hasDropIn,
	hasLanCoop,
	hasOfflineCoop,
	hasOnlineCoop,
	hasOnlineSplitScreen,
	hasSplitScreen,
	offlineCoopMax: offlinecoopmax,
	offlineMax: offlinemax,
	onlineCoopMax: onlinecoopmax,
	onlineMax: onlinemax,
	platform,
}))

export const mapIgdbGame = (game: IgdbGame) => {
	const {
		id, aggregated_rating: rating, aggregated_rating_count: ratingCount, genres = [], summary,
		involved_companies: companies = [], updated_at: updatedAt, name, platforms = [], first_release_date: releaseDate, dlcs = [],
		release_dates: releaseDates = [], game_engines: engines = [], screenshots, cover, status, websites, hypes: hype,
		category, franchises = [], game_modes: modes = [], multiplayer_modes: multiplayerModes = [], parent_game: parentGame,
		player_perspectives: playerPerspectives = [], similar_games: similarGames = [], storyline, themes = [], videos = [],
	} = game

	const screenshotUrls = screenshots && screenshots.length > 0
		? screenshots.map(({ image_id: imageId }) => `${igdbImageUrl}/t_screenshot_med/${imageId}.jpg`).filter(Boolean)
		: []

	return {
		id,
		name,
		category: category ? mapCategory(category) : undefined,
		cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : undefined,
		developers: mapCompanies(companies, 'developer') ?? [],
		dlcs: dlcs.length > 0 ? dlcs.map(({ id, name, cover }) => ({
			id,
			name,
			cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : undefined,
		})) : [],
		engines: engines.length > 0 ? engines : [],
		franchises: franchises.length > 0 ? franchises : [],
		genres: genres.length > 0 ? genres : [],
		hype: Math.round(hype ?? 0),
		modes: modes.length > 0 ? modes : [],
		multiplayerModes: multiplayerModes.length > 0 ? mapMultiplayerMode(multiplayerModes) : [],
		parentId: parentGame,
		platforms: platforms.length > 0 ? platforms.map(({ id, name, abbreviation }) => ({ id, name, abbreviation: abbreviation ?? null })) : [],
		playerPerspectives: playerPerspectives.length > 0 ? playerPerspectives : [],
		porters: mapCompanies(companies, 'porting') ?? [],
		publishers: mapCompanies(companies, 'publisher') ?? [],
		rating: rating ? Math.round(rating) : undefined,
		ratingCount: ratingCount ? Math.round(ratingCount) : undefined,
		releaseDate: releaseDate ? new Date(fromUnixTime(releaseDate)).toISOString() : null,
		releaseDates: releaseDates.length > 0 ? releaseDates.map(({ date, platform }) => ({
			platform: {
				id: platform.id,
				name: platform.name,
				abbreviation: platform.abbreviation ?? null,
			},
			date: date ? new Date(fromUnixTime(date)).toISOString() : null,
		})) : [],
		screenshot: sample(screenshotUrls) ?? undefined,
		similarGames: similarGames.length > 0 ? similarGames.map(({ id, name, cover }) => ({
			id,
			name,
			cover: cover?.image_id ? `${igdbImageUrl}/t_cover_big/${cover.image_id}.jpg` : undefined,
		})) : [],
		status: status ? mapStatus(status) : undefined,
		storyline,
		summary,
		supporters: mapCompanies(companies, 'supporting') ?? [],
		themes: themes.length > 0 ? themes : [],
		updatedAt: updatedAt ? new Date(fromUnixTime(updatedAt)).toISOString() : undefined,
		videos: videos.length > 0 ? videos.map(({ name, video_id: videoId }) => ({ name: name ?? null, videoId })) : [],
		websites: mapWebsites(websites) ?? [],
	}
}
