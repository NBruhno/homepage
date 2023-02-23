import type { VGInsightsGame, VGInsightsHistory, VGInsightsStats } from 'types/vginsights'

import { create, object, string } from 'superstruct'

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
})
	.get(async (req, res) => {
		const { 'steam-app-id': appId } = create(req.query, Query)
		const insights = await monitorAsync(() => fetch(`https://vginsights.com/api/v1/game/${appId}`, {
			method: 'GET',
		}), 'http:vginsights', 'game insights').then(async (response) => {
			if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
			const game = await response.json() as VGInsightsGame
			return {
				rating: game.rating === undefined ? null : parseFloat(game.rating),
				unitsSold: game.units_sold_vgi ?? null,
				revenue: game.revenue_vgi ?? null,
			}
		})

		if (insights.rating && insights.unitsSold) {
			const [playerHistory, stats] = await Promise.all([
				monitorAsync(() => fetch(`https://vginsights.com/api/v1/game/${appId}/history`, {
					method: 'GET',
				}), 'http:vginsights', 'game player history').then(async (response) => {
					if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
					const history = await response.json() as VGInsightsHistory
					return history.map(({ date, players_avg: playersOnAverage }) => ({
						date,
						playersOnAverage,
					}))
				}),
				monitorAsync(() => fetch(`https://vginsights.com/api/v1/game/${appId}/quick-stats`, {
					method: 'GET',
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
				playerHistory,
			})
		}

		return res.status(200).json({
			...insights,
			averagePlaytime: null,
			medianPlaytime: null,
			peakLast24Hours: null,
			currentlyPlaying: null,
			minutesSinceUpdate: null,
			playerHistory: [],
		})
	})
