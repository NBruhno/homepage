import type { GameReviewsItem } from './GameReviewsItem'

export type GameReviews = {
	steam: {
		total: {
			total: number,
			totalPositive: number,
			totalNegative: number,
			score: number,
			scoreDescription: string,
			url: string,
		},
		recent: {
			total: number,
			totalPositive: number,
			totalNegative: number,
			score: number,
			scoreDescription: string,
			reviews: Array<GameReviewsItem>,
		},
		url: string,
	},
}
