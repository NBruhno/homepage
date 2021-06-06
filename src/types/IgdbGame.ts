/* eslint-disable camelcase */

import type { IgdbCompany } from './IgdbCompany'
import type { IgdbEngine } from './IgdbEngine'
import type { IgdbGameCategory } from './IgdbGameCategory'
import type { IgdbGameStatus } from './IgdbGameStatus'
import type { IgdbGenre } from './IgdbGenre'
import type { IgdbImage } from './IgdbImage'
import type { IgdbPlatform } from './IgdbPlatform'
import type { IgdbReleaseDate } from './IgdbReleaseDate'
import type { IgdbWebsite } from './IgdbWebsite'

export type IgdbGame = {
	aggregated_rating_count?: number,
	aggregated_rating?: number,
	category: IgdbGameCategory,
	companies: Array<IgdbCompany>,
	cover?: IgdbImage,
	first_release_date: number | null,
	follows: number,
	game_engines?: Array<IgdbEngine>,
	genres?: Array<IgdbGenre>,
	hypes: number,
	id: number,
	involved_companies?: Array<IgdbCompany>,
	name: string,
	platforms?: Array<IgdbPlatform>,
	release_dates?: Array<IgdbReleaseDate>,
	screenshots: Array<IgdbImage>,
	status: IgdbGameStatus,
	storyline?: string,
	summary?: string,
	updated_at: number,
	websites?: Array<IgdbWebsite>,
}
