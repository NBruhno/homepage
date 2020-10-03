import { differenceInHours } from 'date-fns'

import type { Game, SimpleGame } from 'types/Games'

export const shouldUpdate = (game: Game | SimpleGame, hourInterval: number = 20) => {
	const { lastChecked, updatedAt } = game

	const moreThanADayOld = differenceInHours(Date.now(), updatedAt) >= hourInterval
	const moreThanADaySinceLastCheck = differenceInHours(Date.now(), lastChecked) >= hourInterval

	return Boolean(moreThanADayOld && moreThanADaySinceLastCheck)
}
