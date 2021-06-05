import type { ItadDrm } from './ItadDrm'
import type { ItadShop } from './ItadShop'

/* eslint-disable camelcase */
export type ItadPrices = {
	'.meta': {
		currency: string,
	},
	data: Record<string, {
		list: Array<{
			price_new: number,
			price_old: number,
			price_cut: number,
			url: string,
			shop: ItadShop,
			drm: ItadDrm,
		}>,
	}>,
	urls: {
		game: string,
	},
}
