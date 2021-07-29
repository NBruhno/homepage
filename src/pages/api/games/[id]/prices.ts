import type { NextApiRequest, NextApiResponse } from 'next'

import { withSentry } from '@sentry/nextjs'
import { getActiveTransaction } from '@sentry/tracing'

import { prices } from 'api/games'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	const transaction = getActiveTransaction()
	if (transaction) transaction.setName(`${method} - api/games/{gameId}/prices`)

	await prices(req, res)
}

export default withSentry(handler)
