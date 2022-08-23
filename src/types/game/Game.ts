import type { GameCompany } from './GameCompany'
import type { GameDefaultEntity } from './GameDefaultEntity'
import type { GameMultiplayerMode } from './GameMultiplayerMode'
import type { GamePlatform } from './GamePlatform'
import type { GameReference } from './GameReference'
import type { GameReleaseDate } from './GameReleaseDate'
import type { GameVideo } from './GameVideo'
import type { GameWebsite } from './GameWebsite'
import type { Game as PrismaGame } from '@prisma/client'

export type Game = Omit<PrismaGame, 'createdAt' | 'developers' | 'dlcs' | 'engines' | 'franchies' | 'genres' | 'lastCheckedAt' | 'modes' | 'multiplayerModes' | 'platforms' | 'playerPerspectives' | 'porters' | 'publishers' | 'releaseDate' | 'releaseDates' | 'similarGames' | 'supporters' | 'themes' | 'updatedAt' | 'videos' | 'websites'> & {
	createdAt: string,
	developers: Array<GameCompany>,
	dlcs: Array<GameReference>,
	engines: Array<GameDefaultEntity>,
	franchises: Array<GameDefaultEntity>,
	genres: Array<GameDefaultEntity>,
	lastCheckedAt: string,
	modes: Array<GameDefaultEntity>,
	multiplayerModes: Array<GameMultiplayerMode>,
	platforms: Array<GamePlatform>,
	playerPerspectives: Array<GameDefaultEntity>,
	porters: Array<GameCompany>,
	publishers: Array<GameCompany>,
	releaseDate: string | null,
	releaseDates: Array<GameReleaseDate>,
	similarGames: Array<GameReference>,
	supporters: Array<GameCompany>,
	themes: Array<GameDefaultEntity>,
	updatedAt: string,
	videos: Array<GameVideo>,
	websites: Array<GameWebsite>,
}
