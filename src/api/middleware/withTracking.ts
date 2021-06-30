import type { Transaction } from '@sentry/types'
import type { NextApiRequest, NextApiResponse } from 'next'

import { startTransaction } from '@sentry/nextjs'
import { getActiveTransaction, extractTraceparentData } from '@sentry/tracing'
import { isString } from 'lodash'
import { StructError } from 'superstruct'

import { config } from 'config.server'

import { logger } from 'lib/logger'

import { createAndAttachError } from 'api/errors'

type ApiHandler<T> = (req: NextApiRequest, res: NextApiResponse<T>, transaction: Transaction) => void | Promise<void>

/**
 * Middleware attached at the root to enable Sentry monitoring and exception capturing
 * @param apiHandler - The next ApiHandler
 */
export const withTracking = <T>(apiHandler: ApiHandler<T>) => async (req: NextApiRequest, res: NextApiResponse) => {
	let transaction = getActiveTransaction()

	if (transaction) {
		transaction.setName(`${req.method} - ${req.url?.split('?')[0]}`)
		transaction.setTag('type', req.url?.split('/')[1] ?? 'Unspecified')
		transaction.setTag('resource', req.url?.split('/')[2] ?? 'Unspecified')
		transaction.setData('request', req)
	} else {
		let traceparentData
		if (req.headers && isString(req.headers['sentry-trace'])) {
			traceparentData = extractTraceparentData(req.headers['sentry-trace'] as string)
			logger.log(`[Tracing] Continuing trace ${traceparentData?.traceId}.`)
		}

		transaction = startTransaction({
			op: 'api',
			name: `${req.method} - ${req.url?.split('?')[0]}`,
			trimEnd: false,
			tags: {
				type: req.url?.split('/')[1] ?? 'Unspecified',
				resource: req.url?.split('/')[2] ?? 'Unspecified',
			},
			...traceparentData,
		}, {
			request: req,
		})
	}
	if (config.environment === 'development') logger.debug(`${req.method} - ${req.url}`)

	try {
		return await apiHandler(req, res, transaction)
	} catch (error) {
		let errorToThrow = error
		if (error instanceof StructError) errorToThrow = createAndAttachError(400, res, error)
		throw errorToThrow
	}
}
