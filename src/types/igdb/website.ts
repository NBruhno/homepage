// This is an external API type
/* eslint-disable @typescript-eslint/naming-convention */
import type { IgdbWebsiteCategory } from './websiteCategory'

export type IgdbWebsite = {
	id: number,
	category: IgdbWebsiteCategory,
	trusted: boolean,
	url: string,
}
