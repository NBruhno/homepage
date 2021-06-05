import { withSentry } from '@sentry/nextjs'

import { createAndAttachError } from 'api/errors'
import { game, update } from 'api/games'
import { withSentryTracking } from 'api/middleware'

const handler = withSentryTracking(async (req, res, transaction) => {
	const { query: { id }, method } = req
	const gameId = parseInt(id as string, 10)

	transaction.setName(`${method} - api/games/{gameId}`)
	switch (method) {
		case 'GET': {
			await game(req, res, { gameId, transaction })
			break
		}
		case 'PATCH': {
			await update(req, res, { gameId, transaction })
			break
		}
		default: throw createAndAttachError(405, res)
	}
})

export default withSentry(handler)
