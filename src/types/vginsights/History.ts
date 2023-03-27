/* eslint-disable @typescript-eslint/naming-convention */

export type VGInsightsHistory = Array<{
	steam_id: number,
	date: string,
	players_avg: number,
	units: number,
	units_increase: number,
	members: number,
	reviews: number,
	rating: string,
}>
