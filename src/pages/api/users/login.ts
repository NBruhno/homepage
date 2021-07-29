import type { NextApiRequest, NextApiResponse } from 'next'

import { withSentry } from '@sentry/nextjs'

import { login } from 'api/users'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Cache-Control', 'no-cache')
	return login(req, res)
}

export default withSentry(handler)
