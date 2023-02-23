/* eslint-disable @typescript-eslint/naming-convention */

export type VGInsightsGame = Partial<{
	name: string,
	released: string | null,
	price: string | null,
	price_final: string | null,
	rating: string,
	reviews: number,
	reviews_positive: number,
	reviews_negative: number,
	genres: string,
	developers: string,
	publishers: string,
	languages: string,
	rank_reviews: string,
	rank_positive_rating: string,
	units_sold_vgi: number,
	revenue_vgi: number,
}> & {
	steam_id: number,
}
