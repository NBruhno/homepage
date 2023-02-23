/* eslint-disable @typescript-eslint/naming-convention */

export type VGInsightsStats = Partial<{
	avg_playtime: number | null,
	med_playtime: number | null,
	max_players_24h: number,
	players_latest: number,
	players_latest_time: number,
}>
