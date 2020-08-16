import { WebsiteCategory } from './IGDB'

export type Company = {
	description: string,
	logo?: string,
	name: string,
	slug: string,
	websites: Array<{
		category: WebsiteCategory,
		trusted: boolean,
		url: string,
	}>,
}

export type Platform = {
	logo: string,
	name: string,
	abbreviation: string,
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

export type Game = {
	following: boolean,
	cover: string | null,
	developer: Company,
	engines: Array<Engine> | null,
	genres: Array<string>,
	id: string,
	name: string,
	platforms: Array<Platform>,
	porting: Company,
	publisher: Company,
	rating: number,
	ratingCount: number,
	releaseDate: number | null,
	releaseDates: Array<ReleaseDate> | null,
	screenshot: string | null,
	storyline: string,
	summary: string,
	supporting: Company,
}

export type SimpleGame = Pick<Game, 'id' | 'cover' | 'name' | 'releaseDate' | 'following'>

export type FaunaGame = {
	ref: string,
	ts: number,
	data: {
		id: string,
		owner: string,
		following: boolean,
	},
}
