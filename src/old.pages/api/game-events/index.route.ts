import { type IgdbEvent } from 'types'

import { coerce, create, number, object, optional, pattern, string } from 'superstruct'

import { apiHandler, igdbFetcher, mapIgdbEvent } from 'lib/api'
import { gameFieldsAsList } from 'lib/api/gameFields'

const Query = object({
	take: optional(coerce(number(), pattern(string(), /[1-50]/), (value) => parseInt(value, 10))),
	skip: optional(coerce(number(), pattern(string(), /[0-9]+/), (value) => parseInt(value, 10))),
})

const getHasAfter = (returnCount: number, takeCount: number, hasSkip: boolean) => {
	if (hasSkip) {
		if (returnCount === takeCount + 2) return true
		return false
	}
	if (returnCount === takeCount + 1) return true
	return false
}

export default apiHandler({ validMethods: ['GET'] })
	.get(async (req, res) => {
		const { take = 20, skip = 0 } = create(req.query, Query)
		const hasSkip = skip > 0
		const computedTake = hasSkip ? take + 2 : take + 1
		const computedSkip = hasSkip ? skip - 1 : skip

		const gamesFields = gameFieldsAsList.map((field) => `games.${field}`).join(', ')
		const eventFields = `fields ${gamesFields}, event_logo.image_id, description, name, live_stream_url, start_time, end_time, time_zone, videos.video_id, videos.name, videos.game.id`

		const events = await igdbFetcher<IgdbEvent, false>('/events', res, {
			shouldReturnFirst: false,
			nickname: 'events',
			body: `${eventFields}; limit ${computedTake}; offset ${computedSkip}; sort start_time desc;`,
		}).then((events) => events.map(mapIgdbEvent))

		return res.status(200).json({
			events: hasSkip ? events.slice(1, take + 1) : events,
			skip,
			take,
			before: hasSkip ? events[0] : null,
			after: getHasAfter(events.length, take, hasSkip) ? events.pop() : null,
		})
	})
