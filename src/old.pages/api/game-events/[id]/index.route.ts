import { type IgdbEvent } from 'types'

import { coerce, create, number, object, string } from 'superstruct'

import { apiHandler, igdbFetcher, mapIgdbEvent } from 'lib/api'
import { gameFieldsAsList } from 'lib/api/gameFields'
import { ApiError } from 'lib/errors'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

export default apiHandler({ validMethods: ['GET'] })
	.get(async (req, res) => {
		const { id } = create(req.query, Query)

		const gamesFields = gameFieldsAsList.map((field) => `games.${field}`).join(', ')
		const eventFields = `fields ${gamesFields}, event_logo.image_id, description, name, live_stream_url, start_time, end_time, time_zone, videos.video_id, videos.name, videos.game.id`

		const event = await igdbFetcher<IgdbEvent, true>('/events', res, {
			shouldReturnFirst: true,
			nickname: 'events',
			body: `${eventFields}; where id = ${id};`,
		}).then((event) => {
			if (event) return mapIgdbEvent(event)
			throw ApiError.fromCodeWithCause(404, new Error(`Failed to find IGDB event with ID ${id}`))
		})

		return res.status(200).json(event)
	})
