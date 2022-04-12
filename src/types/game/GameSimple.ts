import type { Game } from './Game'
import type { GameImagePlaceholder } from './GameImagePlaceholder'

export type GameSimple = Pick<Game, 'cover' | 'id' | 'name' | 'releaseDate' | 'status'>

export type GameSimpleExtended = GameSimple & {
	coverProps: GameImagePlaceholder | null,
}
