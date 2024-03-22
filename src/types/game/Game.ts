import type { GameCategory } from './GameCategory'
import type { GameCompany } from './GameCompany'
import type { GameDefaultEntity } from './GameDefaultEntity'
import type { GameMultiplayerMode } from './GameMultiplayerMode'
import type { GamePlatform } from './GamePlatform'
import type { GameReference } from './GameReference'
import type { GameReleaseDate } from './GameReleaseDate'
import type { GameStatus } from './GameStatus'
import type { GameVideo } from './GameVideo'
import type { GameWebsite } from './GameWebsite'

export type Game = {
	id: number,
	name: string,
	category: GameCategory | null,
	cover: string | null,
	hype: number | null,
	parentId: number | null,
	rating: number | null,
	ratingCount: number | null,
	screenshot: string | null,
	status: GameStatus | null,
	storyline: string | null,
	summary: string | null,

	createdAt: string,
	developers: Array<GameCompany>,
	dlcs: Array<GameReference>,
	engines: Array<GameDefaultEntity>,
	franchises: Array<GameDefaultEntity>,
	genres: Array<GameDefaultEntity>,
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
