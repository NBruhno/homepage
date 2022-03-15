import type { Span, Transaction } from '@sentry/types'

import { getActiveTransaction } from '@sentry/tracing'

export const monitor = <T>(functionToWatch: (span?: Span) => T, operationName: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName })
		const result = functionToWatch(span)
		span.finish()
		return result
	} else { // In case Sentry is not currently running properly
		const result = functionToWatch()
		return result
	}
}

export const monitorAsync = async <T>(functionToWatch: (span?: Span) => Promise<T>, operationName: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName })
		const result = await functionToWatch(span)
		span.finish()
		return result
	} else { // In case Sentry is not currently running properly
		const result = await functionToWatch()
		return result
	}
}
