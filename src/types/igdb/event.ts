import type { IgdbGame } from './game'
import type { IgdbImage } from './image'
import type { IgdbVideo } from './video'

export type IgdbEvent = {
	id: number
	name: string
	description?: string
	event_logo?: IgdbImage
	start_time?: number
	end_time?: number
	time_zone?: string
	live_stream_url?: string
	games?: Array<IgdbGame>
	videos?: Array<IgdbVideo & { game: { id: number } }>
}
