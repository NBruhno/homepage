export type GameReviewsItem = {
	author: {
		steamId: string,
		gamesOwned: number,
		gamesReviewed: number,
		playtime: number,
		playtimeAtReview: number,
		playtimeLastTwoWeeks: number,
		lastPlayed: string,
	},
	language: string,
	review: string,
	isRecommended: boolean,
	isWrittenDuringEarlyAccess: boolean,
	votes: {
		up: number,
		funny: number,
		weightedVoteScore: number,
	},
	numberOfComments: number,
	acquisition: {
		isPurchased: boolean,
		isReceivedForFree: boolean,
	},
	url: string,
	createdAt: string,
	updatedAt: string,
}
