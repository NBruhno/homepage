import type { Game } from './Game'
import type { GameVideo } from './GameVideo'

export type GameEvent = {
	id: number
	name: string
	description: string | null
	logo: string | null
	startTime: string | null
	endTime: string | null
	timezone: string | null
	liveStreamUrl: string | null
	games: Array<Game>
	videos: Array<GameVideo>
}
