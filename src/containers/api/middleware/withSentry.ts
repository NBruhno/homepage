import { init, captureException, flush, startTransaction } from '@sentry/node'
import { NextApiRequest, NextApiResponse } from 'next'
import { Transaction } from '@sentry/types'

import { config } from 'config.server'

import { logger } from 'lib/logger'

if (config.sentry.dsn) {
	init({
		enabled: config.environment === 'production',
		dsn: config.sentry.dsn,
		tracesSampleRate: 1,
	})
}

type ApiHandler = (req: NextApiRequest, res: NextApiResponse, transaction: Transaction) => void | Promise<void>

/**
 * Middleware attached at the root to enable Sentry monitoring and exception capturing
 * @param apiHandler - The next ApiHandler
 */
export const withSentry = (apiHandler: ApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	const transaction = startTransaction({
		op: 'request',
		name: `${req.method} - ${req.url.split('?')[0]}`,
		trimEnd: false,
		tags: {
			type: req.url.split('/')[1],
			resource: req.url.split('/')[2],
		},
	}, {
		query: req.query,
	})
	if (config.environment === 'development') logger.debug(`${req.method} - ${req.url}`)
	try {
		return await apiHandler(req, res, transaction)
	} catch (error) {
		captureException(error)
		await flush(2000)
		throw error
	} finally {
		transaction.setHttpStatus(res.statusCode)
		transaction.finish()
	}
}
