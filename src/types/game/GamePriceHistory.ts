export type GamePriceHistory = {
	historicLow: {
		currency: string,
		amount: number,
		difference: number,
		id: string,
		name: string,
		urls: {
			game: string,
			history: string,
		},
	},
	storeHistoricLows: Array<{
		currency: string,
		amount: number,
		id: string,
		name: string,
	}>,
}
