// This is an external API type
/* eslint-disable @typescript-eslint/naming-convention */
import type { IgdbWebsite } from './website'

export type IgdbCompany = {
	developer: boolean,
	publisher: boolean,
	porting: boolean,
	supporting: boolean,
	company: {
		id: number,
		name: string,
		websites: Array<IgdbWebsite>,
	},
}
