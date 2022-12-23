/* eslint-disable @typescript-eslint/naming-convention */

export type SteamReviews = {
	query_summary: {
		num_reviews: number,
		review_score: number,
		review_score_desc: string,
		total_positive: number,
		total_negative: number,
		total_reviews: number,
	},
	reviews: Array<{
		recommendationId: string,
		author: {
			steamid: string,
			num_games_owned: number,
			num_reviews: number,
			playtime_forever: number,
			playtime_last_two_weeks: number,
			playtime_at_review: number,
			last_played: number,
		},
		language: string,
		review: string,
		timestamp_created: number,
		timestamp_updated: number,
		voted_up: boolean,
		votes_up: number,
		votes_funny: number,
		weighted_vote_score: number,
		comment_count: number,
		steam_purchase: boolean,
		received_for_free: boolean,
		written_during_early_access: boolean,
		hidden_in_steam_china: boolean,
		steam_china_location: string,
	}>,
	cursor: string,
}
