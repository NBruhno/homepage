import type { VGInsightsGame, VGInsightsHistory, VGInsightsStats } from 'types/vginsights'

import { create, object, string } from 'superstruct'

import { config } from 'config.server'

import { apiHandler } from 'lib/api'
import type { statusCodes } from 'lib/errors'
import { ApiError } from 'lib/errors'
import { monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	id: string(),
	'steam-app-id': string(),
})

export default apiHandler({
	validMethods: ['GET'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/insights`,
	cacheStrategy: 'StaleWhileRevalidate',
	cacheDuration: 240,
})
	.get(async (req, res) => {
		const { 'steam-app-id': appId } = create(req.query, Query)

		const insights = await monitorAsync(() => fetch(`https://vginsights.com/api/v1/game/${appId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.vgInsights.token}`,
			},
		}), 'http:vginsights', 'game insights').then(async (response) => {
			if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
			if (response.headers.has('Content-Type')) {
				const game = await response.json() as VGInsightsGame
				return {
					rating: game.rating === undefined ? null : parseFloat(game.rating),
					unitsSold: game.units_sold_vgi ?? null,
					revenue: game.revenue_vgi ?? null,
				}
			}
			return {}
		})

		if (insights.rating && insights.unitsSold) {
			const [history, stats] = await Promise.all([
				monitorAsync(() => fetch(`https://vginsights.com/api/v1/game/${appId}/history`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${config.vgInsights.token}`,
					},
				}), 'http:vginsights', 'game player history').then(async (response) => {
					if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
					const history = await response.json() as VGInsightsHistory
					return history.performance.map(({ date, players_avg: playersOnAverage, units: unitsSoldTotal, units_increase: unitsSold, members: followers, reviews, rating }) => ({
						date,
						playersOnAverage,
						unitsSold,
						unitsSoldTotal,
						followers,
						reviews,
						rating,
					}))
				}),
				monitorAsync(() => fetch(`https://vginsights.com/api/v1/game/${appId}/quick-stats`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${config.vgInsights.token}`,
					},
				}), 'http:vginsights', 'game stats').then(async (response) => {
					if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
					const quickStats = await response.json() as VGInsightsStats
					return {
						averagePlaytime: quickStats.avg_playtime ?? null,
						medianPlaytime: quickStats.med_playtime ?? null,
						peakLast24Hours: quickStats.max_players_24h ?? null,
						currentlyPlaying: quickStats.players_latest ?? null,
						minutesSinceUpdate: quickStats.players_latest_time ?? null,
					}
				}),
			])

			return res.status(200).json({
				...insights,
				...stats,
				history,
			})
		}

		return res.status(200).json({
			...insights,
			averagePlaytime: null,
			medianPlaytime: null,
			peakLast24Hours: null,
			currentlyPlaying: null,
			minutesSinceUpdate: null,
			history: [],
		})
	})
