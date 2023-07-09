import { type ItadShop } from './ItadShop'

export type ItadHistoricLow = {
	'.meta': {
		currency: string,
	},
	data: Record<string, {
		shop: ItadShop,
		price: number,
		cut: number,
		added: number,
		urls: {
			game: string,
			history: string,
		},
	}>,
}
