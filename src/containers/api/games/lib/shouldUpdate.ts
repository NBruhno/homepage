import { differenceInHours, fromUnixTime } from 'date-fns'

import type { Game, SimpleGame } from 'types/Games'

export const shouldUpdate = (game: Game | SimpleGame, hourInterval: number = 20) => {
	const { lastChecked, updatedAt } = game

	const updatedAtIsOutdated = differenceInHours(new Date(), new Date(fromUnixTime(updatedAt))) >= hourInterval
	const lastCheckedIsOutdated = differenceInHours(new Date(), new Date(fromUnixTime(lastChecked))) >= hourInterval

	return Boolean(updatedAtIsOutdated && lastCheckedIsOutdated)
}
