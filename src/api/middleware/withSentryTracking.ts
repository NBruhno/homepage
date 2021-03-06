import type { Transaction } from '@sentry/types'
import type { NextApiRequest, NextApiResponse } from 'next'

import { startTransaction } from '@sentry/nextjs'

import { config } from 'config.server'

import { logger } from 'lib/logger'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse, transaction: Transaction) => void | Promise<void>

/**
 * Middleware attached at the root to enable Sentry monitoring and exception capturing
 * @param apiHandler - The next ApiHandler
 */
export const withSentryTracking = (apiHandler: ApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
	const { 'sentry-trace': traceId } = req.headers
	const transaction = startTransaction({
		op: 'api',
		name: `${req.method} - ${req.url?.split('?')[0]}`,
		trimEnd: false,
		traceId: traceId as string | undefined,
		tags: {
			type: req.url?.split('/')[1] ?? 'Unspecified',
			resource: req.url?.split('/')[2] ?? 'Unspecified',
		},
	}, {
		query: req.query,
		url: req.url,
		http: {
			method: req.method,
		},
	})
	res.setHeader('sentry-trace', transaction.traceId)
	if (config.environment === 'development') logger.debug(`${req.method} - ${req.url}`)

	res.on('close', () => {
		transaction.setHttpStatus(res.statusCode)
		transaction.finish()
	})

	try {
		return await apiHandler(req, res, transaction)
	} catch (error) {
		transaction.setHttpStatus(error.statusCode)
		transaction.finish()
		throw error
	}
}
