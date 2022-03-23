import type { Game } from './Game'
import type { GameImagePlaceholder } from './GameImagePlaceholder'
import type { GameReferenceExtended } from './GameReferenceExtended'

export type GameExtended = Game & {
	coverProps: GameImagePlaceholder,
	screenshotProps: GameImagePlaceholder,
	similarGames: Array<GameReferenceExtended>,
}
