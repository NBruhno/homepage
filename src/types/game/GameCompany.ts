import type { GameWebsite } from './GameWebsite'

export type GameCompany = {
	id: number,
	name: string,
	websites: Array<GameWebsite>,
}
