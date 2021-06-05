import type { Game } from './Game'

export type GameSimple = Pick<Game, 'id' | 'cover' | 'name' | 'releaseDate' | 'status' | 'updatedAt' | 'lastChecked'>
