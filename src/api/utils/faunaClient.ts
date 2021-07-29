import type { RequestResult } from 'faunadb'

import { getActiveTransaction } from '@sentry/tracing'
import faunadb from 'faunadb'

import { config } from 'config.server'

import { logger } from 'lib/logger'

const createObserver = () => (res: RequestResult) => {
	if (!res || !res.responseHeaders) return
	const headers = res.responseHeaders as {
		':status': string,
		'x-compute-ops': string,
		'x-query-time': string,
		'x-byte-read-ops': string,
		'x-write-ops': string,
	}

	const transaction = getActiveTransaction()
	if (transaction) {
		transaction.setData('status', headers[':status'])
		transaction.setData('computeOps', headers['x-compute-ops'])
		transaction.setData('queryTime', headers['x-query-time'])
		transaction.setData('readOps', headers['x-byte-read-ops'])
		transaction.setData('writeOps', headers['x-write-ops'])
	}

	if (process.env.NODE_ENV === 'development') {
		logger.debug(`TCOs: ${headers['x-compute-ops']} | TROs: ${headers['x-byte-read-ops']} | TWOs: ${headers['x-write-ops']}`)
	}
}

export const serverClient = () => new faunadb.Client({ secret: config.fauna.secret, observer: createObserver() })
export const faunaClient = (secret: string) => new faunadb.Client({ secret, observer: createObserver() })
