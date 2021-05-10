import faunadb from 'faunadb'

import { config } from 'config.server'

import { logger } from 'lib/logger'

const observer = (res: { responseHeaders: any }) => {
	if (!res || !res.responseHeaders || config.environment !== 'development') return
	const headers = res.responseHeaders
	logger.debug({
		status: headers[':status'],
		computeOps: headers['x-compute-ops'],
		queryTime: headers['x-query-time'],
		readOps: headers['x-byte-read-ops'],
		writeOps: headers['x-write-ops'],
	})
}

export const serverClient = new faunadb.Client({ secret: config.fauna.secret!, observer })
export const faunaClient = (secret: string) => new faunadb.Client({ secret, observer })
