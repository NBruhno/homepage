import { type ItadPrice } from './ItadPrice'
import { type ItadShop } from './ItadShop'

export type ItadStoreHistoricLows = {
	/** UUID */
	id: string,
	lows: Array<{
		shop: ItadShop,
		price: ItadPrice,
		regular: ItadPrice,
		/** In percentage, 0-100 */
		cut: number,
		timestamp: string,
	}>,
}
