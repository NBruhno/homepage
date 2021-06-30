import { withSentry } from '@sentry/nextjs'

import { prices } from 'api/games'
import { withTracking } from 'api/middleware'

const handler = withTracking(async (req, res, transaction) => {
	const { query: { id }, method } = req
	const gameId = parseInt(id as string, 10)

	transaction.setName(`${method} - api/games/{gameId}/prices`)
	await prices(req, res, { gameId, transaction })
})

export default withSentry(handler)
