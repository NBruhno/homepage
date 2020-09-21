import { Transaction } from '@sentry/apm'
import { init, captureException, flush, startTransaction, setUser } from '@sentry/node'
import { NextApiRequest, NextApiResponse } from 'next'

import { config } from 'config.server'
import { authenticate } from './authenticate'

if (config.sentry.dsn) {
	init({
		enabled: config.environment === 'production',
		dsn: config.sentry.dsn,
		tracesSampleRate: 1,
	})
}

type ApiHandler = (req: NextApiRequest, res: NextApiResponse, transaction: Transaction) => void | Promise<void>

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
	}) as Transaction
	transaction.initSpanRecorder()
	try {
		const token = authenticate(req, res, { optional: true, transaction })
		if (token) setUser({ id: token?.userId })
		return await apiHandler(req, res, transaction)
	} catch (error) {
		captureException(error)
		await flush(2000)
		transaction.setHttpStatus(res.statusCode)
		throw error
	} finally {
		transaction.setHttpStatus(res.statusCode)
		transaction.finish()
		setUser(null)
	}
}
