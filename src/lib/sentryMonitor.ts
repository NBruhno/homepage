import type { Span, Transaction } from '@sentry/types'

import { getActiveTransaction } from '@sentry/tracing'
import { addMilliseconds, getUnixTime } from 'date-fns'

import { prisma } from 'lib/api'

export const monitor = <T>(functionToWatch: (span?: Span) => T, operationName: string, description: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName, description })
		const result = functionToWatch(span)
		span.finish()
		return result
	} else { // In case Sentry is not currently running properly
		const result = functionToWatch()
		return result
	}
}

export const monitorAsync = async <T>(functionToWatch: (span?: Span) => Promise<T>, operationName: string, description: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName, description })
		prisma.$on('query', (event) => span.startChild({ // Subscribes to query logs from Prisma
			op: 'db:planetscale',
			description: `${description} - query`,
			data: {
				query: event.query,
			},
			startTimestamp: getUnixTime(event.timestamp),
			endTimestamp: getUnixTime(event.timestamp) + event.duration,
		}))
		const result = await functionToWatch(span)
		span.finish()
		prisma.$on('query', () => undefined)
		return result
	} else { // In case Sentry is not currently running properly
		const result = await functionToWatch()
		return result
	}
}
