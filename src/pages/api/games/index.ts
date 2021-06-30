import { withSentry } from '@sentry/nextjs'

import { createAndAttachError } from 'api/errors/ApiError'
import { games, follows, updateLibrary } from 'api/games'
import { withTracking } from 'api/middleware'

const handler = withTracking(async (req, res, transaction) => {
	const { query: { user }, method } = req

	switch (method) {
		case 'GET': {
			if (user) return follows(req, res, { transaction })
			await games(req, res, { transaction })
			break
		}
		case 'PATCH':
		case 'PUT':
		case 'POST': {
			await updateLibrary(req, res, { transaction })
			break
		}
		default: throw createAndAttachError(405, res)
	}
})

export default withSentry(handler)
