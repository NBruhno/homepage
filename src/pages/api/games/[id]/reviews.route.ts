import type { SteamReviews } from 'types/steam'

import { fromUnixTime } from 'date-fns'
import { create, object, string } from 'superstruct'

import { apiHandler } from 'lib/api'
import type { statusCodes } from 'lib/errors'
import { ApiError } from 'lib/errors'
import { monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	id: string(),
	'steam-app-id': string(),
})

const steamReviewMapper = (reviews: SteamReviews, shouldIncludeReviews = false) => ({
	total: reviews.query_summary.total_reviews,
	totalPositive: reviews.query_summary.total_positive,
	totalNegative: reviews.query_summary.total_negative,
	score: reviews.query_summary.review_score,
	scoreDescription: reviews.query_summary.review_score_desc,
	reviews: shouldIncludeReviews ? reviews.reviews.map((review) => ({
		author: {
			steamId: review.author.steamid,
			gamesOwned: review.author.num_games_owned,
			gamesReviewed: review.author.num_reviews,
			playtime: review.author.playtime_forever,
			playtimeAtReview: review.author.playtime_at_review,
			playtimeLastTwoWeeks: review.author.playtime_last_two_weeks,
			lastPlayed: new Date(fromUnixTime(review.author.last_played)).toISOString(),
		},
		language: review.language,
		review: review.review,
		isRecommended: review.voted_up,
		isWrittenDuringEarlyAccess: review.written_during_early_access,
		votes: {
			up: review.voted_up,
			funny: review.votes_funny,
			weightedVoteScore: review.weighted_vote_score,
		},
		numberOfComments: review.comment_count,
		acquisition: {
			isPurchased: review.steam_purchase,
			isReceivedForFree: review.received_for_free,
		},
		url: '',
		createdAt: new Date(fromUnixTime(review.timestamp_created)).toISOString(),
		updatedAt: new Date(fromUnixTime(review.timestamp_updated)).toISOString(),
	})) : undefined,
})

export default apiHandler({
	validMethods: ['GET'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/reviews`,
})
	.get(async (req, res) => {
		const { 'steam-app-id': appId } = create(req.query, Query)
		const total = await monitorAsync(() => fetch(`https://store.steampowered.com/appreviews/${appId}?json=1&language=all&purchase_type=all&num_per_page=0`, {
			method: 'GET',
		}), 'http:steam', 'total game reviews').then(async (response) => {
			if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
			const reviews = await response.json() as SteamReviews
			return steamReviewMapper(reviews)
		})
		const recent = await monitorAsync(() => fetch(`https://store.steampowered.com/appreviews/${appId}?json=1&language=english&purchase_type=steam&day_range=31&num_per_page=10`, {
			method: 'GET',
		}), 'http:steam', 'recent game reviews').then(async (response) => {
			if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
			const reviews = await response.json() as SteamReviews
			return steamReviewMapper(reviews, true)
		})

		return res.status(200).json({
			steam: {
				total,
				recent,
				url: `https://store.steampowered.com/app/${appId}/#app_reviews_hash`,
			},
		})
	})
