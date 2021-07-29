import type { NextApiRequest, NextApiResponse } from 'next'

import { withSentry } from '@sentry/nextjs'

import { createAndAttachError } from 'api/errors/ApiError'
import { games, follows, updateLibrary } from 'api/games'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { user }, method } = req

	switch (method) {
		case 'GET': {
			if (user) return follows(req, res)
			await games(req, res)
			break
		}
		case 'PATCH':
		case 'PUT':
		case 'POST': {
			await updateLibrary(req, res)
			break
		}
		default: throw createAndAttachError(405, res)
	}
}

export default withSentry(handler)
