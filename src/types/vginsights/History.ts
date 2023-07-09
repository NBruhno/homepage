/* eslint-disable @typescript-eslint/naming-convention */

export type VGInsightsHistory = {
	performance: Array<{
		steam_id: number,
		date: string,
		players_avg: number,
		units: number,
		units_increase: number,
		members: number,
		reviews: number,
		rating: string,
	}>,
	priceChangers: Array<{
		ts: string,
		initial: number,
		final: number,
		days: number | null,
	}>,
}
