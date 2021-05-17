import { withSentry } from '@sentry/nextjs'

import { sendError } from 'containers/api/errors/ApiError'
import { game, update } from 'containers/api/games'
import { withSentryTracking } from 'containers/api/middleware'

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
		default: sendError(405, res)
	}
})

export default withSentry(handler)
