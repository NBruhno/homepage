import type { GameReleaseDate } from 'types'

export const groupByReleaseDate = (releaseDates: Array<GameReleaseDate>, keyGetter: ({ date }: GameReleaseDate) => string | null, firstReleaseDate: string | null) => {
	const map = new Map<string, Array<string>>()
	releaseDates.forEach((item) => {
		const key = keyGetter(item)
		if (key) {
			const collection = map.get(key)
			if (firstReleaseDate === item.date) return null
			if (!collection) {
				map.set(key, [item.platform.abbreviation || item.platform.name])
			} else {
				collection.push(item.platform.abbreviation || item.platform.name)
			}
		}
	})
	return [...map].map<{ date: string, platforms: Array<string> }>(([date, platforms]) => ({ date, platforms }))
}
