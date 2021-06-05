import type { Game, GameSimple } from 'types'

import { differenceInHours, fromUnixTime } from 'date-fns'

export const gameShouldUpdate = (game: Game | GameSimple, hourInterval: number = 20) => {
	const { lastChecked, updatedAt } = game

	const updatedAtIsOutdated = differenceInHours(new Date(), new Date(fromUnixTime(updatedAt))) >= hourInterval
	const lastCheckedIsOutdated = differenceInHours(new Date(), new Date(fromUnixTime(lastChecked))) >= hourInterval

	return Boolean(updatedAtIsOutdated && lastCheckedIsOutdated)
}
