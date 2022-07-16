import type { GameSimple } from 'types'

export type GameData = {
	games: Array<GameSimple>,
	after: GameSimple | null,
	before: GameSimple | null,
}

export type PageData = {
	isLimitReached: boolean,
	numberOfPages: number,
	take: number,
	skips: Array<number>,
}