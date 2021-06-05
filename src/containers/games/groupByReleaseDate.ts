import type { GameReleaseDate } from 'types'

export const groupByReleaseDate = (releaseDates: Array<GameReleaseDate>, keyGetter: ({ date }: GameReleaseDate) => number, firstReleaseDate: number | null) => {
	const map = new Map()
	releaseDates.forEach((item) => {
		const key = keyGetter(item)
		const collection = map.get(key)
		if (firstReleaseDate === item.date) return null
		if (!collection) {
			map.set(key, [item.platform.abbreviation || item.platform.name])
		} else {
			collection.push(item.platform.abbreviation || item.platform.name)
		}
	})
	return [...map].map<{ date: number, platforms: Array<string> }>(([date, platforms]) => ({ date, platforms }))
}
