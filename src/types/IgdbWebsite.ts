import type { IgdbWebsiteCategory } from './IgdbWebsiteCategory'

export type IgdbWebsite = {
	category: IgdbWebsiteCategory,
	id: number,
	trusted: boolean,
	url: string,
}
