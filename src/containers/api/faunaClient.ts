import type { Span, Transaction } from '@sentry/types'
import type { RequestResult } from 'faunadb'

import faunadb from 'faunadb'

import { config } from 'config.server'

import { logger } from 'lib/logger'

const createObserver = (transaction: Transaction | Span) => (res: RequestResult) => {
	if (!res || !res.responseHeaders) return
	const headers = res.responseHeaders as {
		':status': string,
		'x-compute-ops': string,
		'x-query-time': string,
		'x-byte-read-ops': string,
		'x-write-ops': string,
	}
	transaction.setData('status', headers[':status'])
	transaction.setData('computeOps', headers['x-compute-ops'])
	transaction.setData('queryTime', headers['x-query-time'])
	transaction.setData('readOps', headers['x-byte-read-ops'])
	transaction.setData('writeOps', headers['x-write-ops'])
	if (config.environment === 'development') {
		logger.debug(`TCOs: ${headers['x-compute-ops']} | TROs: ${headers['x-byte-read-ops']} | TWOs: ${headers['x-write-ops']}`)
	}
}

export const serverClient = (transaction: Span | Transaction) => new faunadb.Client({ secret: config.fauna.secret, observer: createObserver(transaction) })
export const faunaClient = (secret: string, transaction: Span | Transaction) => new faunadb.Client({ secret, observer: createObserver(transaction) })
