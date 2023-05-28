import type { GameSimple, GameSimpleExtended } from 'types'

export type GameData = {
	games: Array<GameSimpleExtended>,
	after: GameSimple | null,
	before: GameSimple | null,
	skip: number,
	take: number,
}

export type PageData = {
	isLimitReached: boolean,
	numberOfPages: number,
	take: number,
	skips: Array<number>,
}
