import { type ItadPrice } from './ItadPrice'
import { type ItadShop } from './ItadShop'

/* eslint-disable camelcase */
export type ItadPrices = {
	/** UUID */
	id: string,
	deals: Array<{
		shop: ItadShop,
		price: ItadPrice,
		regular: ItadPrice,
		/** In percentage, 0-100 */
		cut: number,
		voucher: string | null,
		storeLow: ItadPrice | null,
		historyLow: ItadPrice | null,
		/**
		 * * `H`: Historical low
		 * * `N`: New historical low
		 * * `S`: Store low
		*/
		flag: 'H' | 'N' | 'S' | null,
		drm: {
			id: string,
			name: string,
		},
		platforms: Array<{
			id: string,
			name: string,
		}>,
		timestamp: string,
		expiry: string | null,
		url: string,
	}>,
}
