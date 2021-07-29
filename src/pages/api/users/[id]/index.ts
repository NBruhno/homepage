import type { NextApiRequest, NextApiResponse } from 'next'

import { withSentry } from '@sentry/nextjs'

import { user } from 'api/users'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { id } } = req

	res.setHeader('Cache-Control', 'no-cache')
	return user(req, res, { userId: id as string })
}

export default withSentry(handler)
