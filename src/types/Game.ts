import type { GameCompany } from './GameCompany'
import type { GameEngine } from './GameEngine'
import type { GamePlatform } from './GamePlatform'
import type { GameReleaseDate } from './GameReleaseDate'
import type { GameStatus } from './GameStatus'
import type { GameWebsite } from './GameWebsite'

export type Game = {
	cover: string | null,
	developer: GameCompany | null,
	engines: Array<GameEngine> | null,
	genres: Array<string>,
	hype: number,
	id: number,
	lastChecked: number,
	name: string,
	platforms: Array<GamePlatform> | null,
	publisher: GameCompany | null,
	rating: number | null,
	ratingCount: number | null,
	releaseDate: number | null,
	releaseDates: Array<GameReleaseDate> | null,
	screenshot: string | null,
	status: GameStatus | null,
	summary: string | null,
	updatedAt: number,
	websites: Array<GameWebsite>,
}
