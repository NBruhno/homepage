import type { GameEvent, GameSimple } from 'types'

export type GameData = {
	games: Array<GameSimple>,
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

export type GameEventData = {
	events: Array<GameEvent>,
	after: GameEvent | null,
	before: GameEvent | null,
	skip: number,
	take: number,
}
