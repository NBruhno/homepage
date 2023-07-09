export type ItadStoreHistoricLows = {
	'.meta': {
		currency: string,
	},
	data: Record<string, Array<{
		shop: string,
		price: number,
	}>>,
}
