export type GameInsights = {
	rating: number | null,
	unitsSold: number | null,
	revenue: number | null,
	averagePlaytime: number | null,
	medianPlaytime: number | null,
	peakLast24Hours: number | null,
	currentlyPlaying: number | null,
	minutesSinceUpdate: number | null,
	playerHistory: Array<{
		date: string,
		playersOnAverage: number,
	}>,
}
