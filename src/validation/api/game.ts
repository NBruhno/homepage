import type { GameCategory, GameStatus } from '@prisma/client'

import { optional, string, object, number, array, enums, boolean, nullable } from 'superstruct'

const status = optional(enums<GameStatus>(['Alpha', 'Beta', 'EarlyAccess', 'Offline', 'Released', 'Cancelled', 'Rumored', 'Delisted']))

const simpleGame = object({
	id: number(),
	name: string(),
	cover: optional(string()),
})

const website = object({
	type: string(),
	url: string(),
})

const defaultEntity = object({
	id: number(),
	name: string(),
})

const company = object({
	id: number(),
	name: string(),
	websites: optional(array(website)),
})

const platform = object({
	id: number(),
	abbreviation: nullable(string()),
	name: string(),
})

export const game = object({
	id: number(),
	name: string(),
	category: optional(enums<GameCategory>(['Bundle', 'DLCAddon', 'Episode', 'ExpandedGame', 'Expansion', 'Fork', 'MainGame', 'Mod', 'Port', 'Remake', 'Remaster', 'Season', 'StandaloneExpansion'])),
	cover: optional(string()),
	developers: optional(array(company)),
	dlcs: optional(array(simpleGame)),
	engines: optional(array(defaultEntity)),
	franchises: optional(array(defaultEntity)),
	genres: optional(array(defaultEntity)),
	hype: optional(number()),
	lastChecked: optional(string()),
	modes: optional(array(defaultEntity)),
	multiplayerModes: optional(array(object({
		hasCampaignCoop: optional(boolean()),
		hasDropIn: optional(boolean()),
		hasLanCoop: optional(boolean()),
		hasOfflineCoop: optional(boolean()),
		hasOnlineCoop: optional(boolean()),
		hasOnlineSplitScreen: optional(boolean()),
		hasSplitScreen: optional(boolean()),
		offlineCoopMax: optional(number()),
		offlineMax: optional(number()),
		onlineCoopMax: optional(number()),
		onlineMax: optional(number()),
		platform: optional(platform),
	}))),
	parentId: optional(number()),
	platforms: optional(array(platform)),
	playerPerspectives: optional(array(defaultEntity)),
	porters: optional(array(company)),
	publishers: optional(array(company)),
	rating: optional(number()),
	ratingCount: optional(number()),
	releaseDate: optional(string()),
	releaseDates: optional(array(object({
		date: optional(string()),
		platform,
	}))),
	screenshot: optional(string()),
	similarGames: optional(array(simpleGame)),
	status,
	storyline: optional(string()),
	summary: optional(string()),
	supporters: optional(array(company)),
	themes: optional(array(defaultEntity)),
	updatedAt: optional(string()),
	videos: optional(array(object({
		name: nullable(string()),
		videoId: string(),
	}))),
	websites: optional(array(website)),
})
