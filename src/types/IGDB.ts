/* eslint-disable camelcase */

export enum WebsiteCategory {
	Official = 1,
	Wiki = 2,
	Wikipedia = 3,
	Facebook = 4,
	Twitter = 5,
	Twitch = 6,
	Instagram = 8,
	YouTube = 9,
	iPhone = 10,
	iPad = 11,
	Android = 12,
	Steam = 13,
	Reddit = 14,
	Itch = 15,
	EpicGames = 16,
	GoG = 17,
	Discord = 18,
}

export enum GameCategory {
	MainGame = 0,
	DLCAddon = 1,
	Expansion = 2,
	Bundle = 3,
	StandaloneExpansion = 4,
	Mod = 5,
	Episode = 6,
}

export enum GameStatus {
	Released = 0,
	Alpha = 2,
	Beta = 3,
	EarlyAccess = 4,
	Offline = 5,
	Cancelled = 6,
	Rumored = 7,
}

export type Image = {
	alpha_channel?: boolean,
	animated?: boolean,
	height: number,
	image_id: string,
	width: number,
}

export type Website = {
	category: WebsiteCategory,
	id: number,
	trusted: boolean,
	url: string,
}

export type Genre = {
	name: string,
	slug: string,
}

export type Engine = {
	description?: string,
	logo?: Image,
	name: string,
}

export type Platform = {
	abbreviation?: string,
	name: string,
	platform_logo?: Image,
}

export type Company = {
	developer: boolean,
	publisher: boolean,
	porting: boolean,
	supporting: boolean,
	company: {
		description: string,
		logo?: {
			id: number,
			alpha_channel: boolean,
			image_id: number,
		},
		name: string,
		slug: string,
		websites: Array<Website>,
	},
}

export type ReleaseDate = {
	date: number,
	platform: Platform,
}

export type Game = {
	aggregated_rating_count?: number,
	aggregated_rating?: number,
	category: GameCategory,
	companies: Array<Company>,
	cover?: Image,
	first_release_date: number | null,
	game_engines?: Array<Engine>,
	genres?: Array<Genre>,
	id: number,
	involved_companies?: Array<Company>,
	name: string,
	platforms?: Array<Platform>,
	release_dates?: Array<ReleaseDate>,
	screenshots: Array<Image>,
	slug: string,
	status: GameStatus,
	storyline?: string,
	summary?: string,
	websites?: Array<Website>,
}
