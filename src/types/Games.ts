import type { WebsiteCategory } from './IGDB'

export enum ListTypes {
	Popular = 'popular',
	Search = 'search',
	Following = 'following',
}

export enum Status {
	Alpha = 'Alpha',
	Beta = 'Beta',
	EarlyAccess = 'Early access',
	Offline = 'Offline',
	Released = 'Released',
	Rumored = 'Rumored',
}

export type Website = {
	category: WebsiteCategory,
	trusted: boolean,
	url: string,
}

export type Company = {
	description: string,
	logo: string | null,
	name: string,
	slug: string,
	websites: Array<Website>,
}

export type Platform = {
	abbreviation: string | null,
	logo: string | null,
	name: string,
}

export type Engine = {
	description: string | null,
	logo: string | null,
	name: string,
}

export type ReleaseDate = {
	date: number,
	platform: Platform,
}

export type Game = {
	cover: string | null,
	developer: Company | null,
	engines: Array<Engine> | null,
	genres: Array<string>,
	hype: number,
	id: number,
	lastChecked: number,
	name: string,
	platforms: Array<Platform> | null,
	porting: Company | null,
	publisher: Company | null,
	rating: number | null,
	ratingCount: number | null,
	releaseDate: number | null,
	releaseDates: Array<ReleaseDate> | null,
	screenshot: string | null,
	status: Status | null,
	storyline: string | null,
	summary: string | null,
	supporting: Company | null,
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

export type Price = {
	currency: string,
	current: number,
	difference: number,
	id: string,
	name: string,
	url: string,
}
