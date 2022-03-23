import type { Game } from './Game'
import type { GameImagePlaceholder } from './GameImagePlaceholder'
import type { GameReferenceExtended } from './GameReferenceExtended'

export type GameExtended = Game & {
	coverProps: GameImagePlaceholder | null,
	screenshotProps: GameImagePlaceholder | null,
	similarGames: Array<GameReferenceExtended>,
}
