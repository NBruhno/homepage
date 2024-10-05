export type GamePrice = {
	currency: string,
	amount: number,
	difference: number,
	id: string,
	name: string,
	gameName: string,
	platform: string | null,
	hasStock: 'yes' | 'no' | 'unknown',
	url: string,
}
