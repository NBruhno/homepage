import { WebsiteCategory } from './IGDB'

export type Website = {
	category: WebsiteCategory,
	trusted: boolean,
	url: string,
}

export type Company = {
	description: string,
	logo?: string,
	name: string,
	slug: string,
	websites: Array<Website>,
}

export type Platform = {
	abbreviation: string,
	logo: string,
	name: string,
}

export type Engine = {
	description?: string,
	logo?: string,
	name: string,
}

export type ReleaseDate = {
	date: number,
	platform: Platform,
}

export enum Status {
	Alpha = 'Alpha',
	Beta = 'Beta',
	EarlyAccess = 'Early access',
	Offline = 'Offline',
	Released = 'Released',
	Rumored = 'Rumored',
}

export type Game = {
	cover: string | null,
	developer: Company,
	engines: Array<Engine> | null,
	genres: Array<string>,
	hype: number,
	id: string,
	igdbId: number,
	lastChecked: number,
	name: string,
	platforms: Array<Platform>,
	porting: Company,
	publisher: Company,
	rating: number,
	ratingCount: number,
	releaseDate: number | null,
	releaseDates: Array<ReleaseDate> | null,
	screenshot: string | null,
	status: Status | null,
	storyline: string,
	summary: string,
	supporting: Company,
	updatedAt: number,
	websites: Array<Website>,
}

export type SimpleGame = Pick<Game, 'id' | 'cover' | 'name' | 'releaseDate' | 'status' | 'updatedAt' | 'lastChecked'>

export type FaunaGame = {
	ref: string,
	ts: number,
	data: {
		id: string,
		owner: string,
		following: boolean,
	},
}

export type GameList = {
	following: Array<SimpleGame>,
	games: Array<SimpleGame>,
	popular: Array<SimpleGame>,
}

export enum ListTypes {
	Popular = 'popular',
	Search = 'search',
	Following = 'following',
}
