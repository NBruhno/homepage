import { withSentry } from '@sentry/nextjs'

import { createAndAttachError } from 'api/errors'
import { unfollow, follow } from 'api/games'
import { withTracking } from 'api/middleware'

const handler = withTracking(async (req, res, transaction) => {
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
