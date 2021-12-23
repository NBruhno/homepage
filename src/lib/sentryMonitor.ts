import type { Span, Transaction } from '@sentry/types'

import { getActiveTransaction } from '@sentry/tracing'

/**
 * How is this to type on? I'd say it's pretty good!
 * @param functionToWatch
 * @param operationName
 * @param transaction
 */
export const monitor = <T>(functionToWatch: (span?: Span) => T, operationName: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName })
		functionToWatch(span)
		span.finish()
	} else {
		functionToWatch()
	}
}

export const monitorReturn = <T>(functionToWatch: (span?: Span) => T, operationName: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName })
		const result = functionToWatch(span)
		span.finish()
		return result
	} else {
		const result = functionToWatch()
		return result
	}
}

export const monitorAsync = async <T>(functionToWatch: (span?: Span) => Promise<T>, operationName: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName })
		await functionToWatch(span)
		span.finish()
	} else {
		await functionToWatch()
	}
}

export const monitorReturnAsync = async <T>(functionToWatch: (span?: Span) => Promise<T>, operationName: string, transaction?: Span | Transaction) => {
	const transactionToUse = transaction ?? getActiveTransaction()
	if (transactionToUse) {
		const span = transactionToUse.startChild({ op: operationName })
		const result = await functionToWatch(span)
		span.finish()
		return result
	} else {
		const result = await functionToWatch()
		return result
	}
}
