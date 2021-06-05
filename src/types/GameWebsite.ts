import type { IgdbWebsiteCategory } from './IgdbWebsiteCategory'

export type GameWebsite = {
	category: IgdbWebsiteCategory,
	trusted: boolean,
	url: string,
}
