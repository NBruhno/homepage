import { WebsiteCategory } from './IGDB'

type Company = {
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

export type Game = {
	following: boolean,
	cover: string,
	developer: Company,
	engines: Array<{
		description?: string,
		logo?: string,
		name: string,
	}> | null,
	genres: Array<string>,
	id: string,
	name: string,
	platforms: Array<{
		logo: string,
		name: string,
		abbreviation: string,
	}>,
	porting: Company,
	publisher: Company,
	rating: number,
	ratingCount: number,
	releaseDate: number,
	releaseDates: Array<{
		date: number,
		platform: {
			logo: string,
			name: string,
			abbreviation: string,
		},
	}> | null,
	screenshot: string | null,
	storyline: string,
	summary: string,
	supporting: Company,
}

export type SimpleGame = {
	id: string,
	cover: string | null,
	name: string,
	releaseDate: number | null,
	following: boolean,
}
