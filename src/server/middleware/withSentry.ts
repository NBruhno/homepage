import { init, captureException, flush } from '@sentry/node'
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

import { config } from 'config.server'

if (config.sentry.dsn) {
	init({
		enabled: config.environment === 'production',
		dsn: config.sentry.dsn,
	})
}

export const withSentry = (apiHandler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		return await apiHandler(req, res)
	} catch (error) {
		captureException(error)
		await flush(2000)
		throw error
	}
}
