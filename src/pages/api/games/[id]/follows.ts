import { withSentry } from '@sentry/nextjs'

import { createAndAttachError } from 'containers/api/errors/ApiError'
import { unfollow, follow } from 'containers/api/games'
import { withSentryTracking } from 'containers/api/middleware'

const handler = withSentryTracking(async (req, res, transaction) => {
	const { query: { id }, method } = req
	const gameId = parseInt(id as string, 10)

	transaction.setName(`${method} - api/games/{gameId}/follow`)
	switch (method) {
		case 'GET':
		case 'POST': {
			await follow(req, res, { gameId, transaction })
			break
		}
		case 'PATCH': {
			await unfollow(req, res, { gameId, transaction })
			break
		}
		default: throw createAndAttachError(405, res)
	}
})

export default withSentry(handler)
