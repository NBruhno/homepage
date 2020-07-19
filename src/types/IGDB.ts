/* eslint-disable camelcase */

enum WebsiteCategory {
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
}

enum GameCategory {
	MainGame = 0,
	DLCAddon = 1,
	Expansion = 2,
	Bundle = 3,
	StandaloneExpansion = 4,
	Mod = 5,
	Episode = 6,
}

type Image = {
	alpha_channel?: boolean,
	animated?: boolean,
	height: number,
	image_id: string,
	width: number,
}

type Website = {
	category: WebsiteCategory,
	trusted: boolean,
	url: string,
}

type Genre = {
	name: string,
	slug: string,
}

type Engine = {
	description?: string,
	logo?: Image,
	name: string,
}

type Platform = {
	abbreviation?: string,
	name: string,
	platform_logo?: Image,
}

type Company = {
	description: string,
	developer: boolean,
	publisher: boolean,
	porting: boolean,
	supporting: boolean,
	logo?: {
		id: number,
		alpha_channel: boolean,
		image_id: number,
	},
	name: string,
	slug: string,
	websites: Array<Website>,
}

type ReleaseDate = {
	date: number,
	platform: Platform,
}

export type Game = {
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
	storyline?: string,
	summary?: string,
	aggregated_rating?: number,
	aggregated_rating_count?: number,
}
