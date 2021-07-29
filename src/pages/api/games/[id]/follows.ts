import type { NextApiRequest, NextApiResponse } from 'next'

import { withSentry } from '@sentry/nextjs'
import { getActiveTransaction } from '@sentry/tracing'

import { createAndAttachError } from 'api/errors'
import { unfollow, follow } from 'api/games'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { id }, method } = req
	const gameId = parseInt(id as string, 10)

	const transaction = getActiveTransaction()
	if (transaction) transaction.setName(`${method} - api/games/{gameId}/follow`)

	switch (method) {
		case 'GET':
		case 'POST': {
			await follow(req, res, { gameId })
			break
		}
		case 'PATCH': {
			await unfollow(req, res, { gameId })
			break
		}
		default: throw createAndAttachError(405, res)
	}
}

export default withSentry(handler)
