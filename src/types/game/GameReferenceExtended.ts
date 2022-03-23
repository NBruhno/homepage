import type { GameImagePlaceholder } from './GameImagePlaceholder'
import type { GameReference } from './GameReference'

export type GameReferenceExtended = GameReference & {
	coverProps: GameImagePlaceholder | null,
}
