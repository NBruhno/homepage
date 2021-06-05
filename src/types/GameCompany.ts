import type { GameWebsite } from './GameWebsite'

export type GameCompany = {
	description: string,
	logo: string | null,
	name: string,
	slug: string,
	websites: Array<GameWebsite>,
}
