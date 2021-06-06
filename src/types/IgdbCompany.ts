/* eslint-disable camelcase */
import type { IgdbWebsite } from './IgdbWebsite'

export type IgdbCompany = {
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
		websites: Array<IgdbWebsite>,
	},
}
