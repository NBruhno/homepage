import { type ItadPrice } from './ItadPrice'
import { type ItadShop } from './ItadShop'

export type ItadHistoricLow = {
	/** UUID */
	id: string,
	low: {
		shop: ItadShop,
		price: ItadPrice,
		regular: ItadPrice,
		/** In percentage, 0-100 */
		cut: number,
		timestamp: string,
	},
}
