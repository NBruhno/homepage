import type { Game } from './Game'

export type GameSimple = Pick<Game, 'cover' | 'id' | 'name' | 'releaseDate' | 'status'>
