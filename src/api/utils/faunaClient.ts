import type { RequestResult } from 'faunadb'

import faunadb from 'faunadb'

import { config } from 'config.server'

import { logger } from 'lib/logger'

import { updateTransaction } from './updateTransaction'

const createObserver = () => (res: RequestResult) => {
	if (!res || !res.responseHeaders) return
	const headers = res.responseHeaders as {
		':status': string,
		'x-compute-ops': string,
		'x-query-time': string,
		'x-byte-read-ops': string,
		'x-write-ops': string,
	}

	updateTransaction({
		data: [
			{ label: 'Fauna status code', value: headers[':status'] },
			{ label: 'Fauna query time', value: headers['x-query-time'] },
			{ label: 'Fauna TCOs', value: headers['x-compute-ops'] },
			{ label: 'Fauna TROs', value: headers['x-byte-read-ops'] },
			{ label: 'Fauna TWOs', value: headers['x-write-ops'] },
		],
	})

	if (process.env.NODE_ENV === 'development') {
		logger.debug(`TCOs: ${headers['x-compute-ops']} | TROs: ${headers['x-byte-read-ops']} | TWOs: ${headers['x-write-ops']}`)
	}
}

export const serverClient = () => new faunadb.Client({
	secret: config.fauna.secret,
	observer: createObserver(),
})
export const faunaClient = (secret: string) => new faunadb.Client({
	secret,
	observer: createObserver(),
})
