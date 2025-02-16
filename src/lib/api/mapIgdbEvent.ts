import type { IgdbEvent } from 'types'

import { fromUnixTime } from 'date-fns'

import { mapIgdbGame } from './mapIgdbGame'

export const igdbImageUrl = 'https://images.igdb.com/igdb/image/upload'

export const mapIgdbEvent = (event: IgdbEvent) => {
	const {
		id,
		name,
		description,
		event_logo: eventLogo,
		start_time: startTime,
		games,
		end_time: endTime,
		time_zone: timezone,
		live_stream_url: liveStreamUrl,
		videos,
	} = event

	return {
		id,
		name,
		description,
		startTime: startTime ? new Date(fromUnixTime(startTime)).toISOString() : null,
		endTime: endTime ? new Date(fromUnixTime(endTime)).toISOString() : null,
		timezone,
		liveStreamUrl,
		logo: eventLogo?.image_id ? `${igdbImageUrl}/t_1080p/${eventLogo.image_id}.jpg` : null,
		games: games ? games.map(mapIgdbGame) : [],
		videos:
			videos && videos.length > 0 ? videos.map(({ name, video_id: videoId }) => ({ name: name ?? null, videoId })) : [],
	}
}
