import { init, captureException, flush, startTransaction } from '@sentry/node'
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'

if (config.sentry.dsn) {
	init({
		enabled: true, // config.environment === 'production'
		dsn: config.sentry.dsn,
		tracesSampleRate: 0.5,
	})
}

export const withSentry = (apiHandler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	const { origin } = absoluteUrl(req)
	const transaction = startTransaction({
		op: req.url,
		name: origin,
	})

	try {
		return await apiHandler(req, res)
	} catch (error) {
		captureException(error)
		await flush(2000)
		throw error
	} finally {
		transaction.finish()
	}
}
