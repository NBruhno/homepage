/* eslint-disable @typescript-eslint/naming-convention */
import type { IgdbCategory } from './category'
import type { IgdbCompany } from './company'
import type { IgdbEngine } from './engine'
import type { IgdbFranchise } from './franchise'
import type { IgdbGenre } from './genre'
import type { IgdbImage } from './image'
import type { IgdbMode } from './mode'
import type { IgdbMultiplayerMode } from './multiplayerMode'
import type { IgdbPlatform } from './platform'
import type { IgdbPlayerPerspective } from './playerPerspective'
import type { IgdbReleaseDate } from './releaseDate'
import type { IgdbStatus } from './status'
import type { IgdbTheme } from './theme'
import type { IgdbVideo } from './video'
import type { IgdbWebsite } from './website'

export type IgdbGame = {
	id: number,
	name: string,
	aggregated_rating_count?: number,
	aggregated_rating?: number,
	category?: IgdbCategory,
	companies?: Array<IgdbCompany>,
	cover?: IgdbImage,
	dlcs?: Array<Pick<IgdbGame, 'cover' | 'id' | 'name'>>,
	first_release_date: number | null,
	follows: number | null,
	franchises?: Array<IgdbFranchise>,
	game_engines?: Array<IgdbEngine>,
	game_modes?: Array<IgdbMode>,
	genres?: Array<IgdbGenre>,
	hypes: number | null,
	involved_companies?: Array<IgdbCompany>,
	multiplayer_modes?: Array<IgdbMultiplayerMode>,
	parent_game?: number,
	platforms?: Array<IgdbPlatform>,
	player_perspectives?: Array<IgdbPlayerPerspective>,
	release_dates?: Array<IgdbReleaseDate>,
	screenshots?: Array<IgdbImage>,
	similar_games?: Array<Pick<IgdbGame, 'cover' | 'id' | 'name'>>,
	status?: IgdbStatus,
	storyline?: string,
	summary?: string,
	themes?: Array<IgdbTheme>,
	updated_at: number,
	videos?: Array<IgdbVideo>,
	websites?: Array<IgdbWebsite>,
}
