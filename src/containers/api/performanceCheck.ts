import type { Span, Transaction } from '@sentry/types'

/**
 * How is this to type on? I'd say it's pretty good!
 * @param functionToWatch
 * @param operationName
 * @param transaction
 */
export const monitor = <T>(functionToWatch: (span: Span) => T, operationName: string, transaction: Transaction | Span) => {
	const span = transaction.startChild({ op: operationName })
	functionToWatch(span)
	span.finish()
}

export const monitorReturn = <T>(functionToWatch: (span: Span) => T, operationName: string, transaction: Transaction | Span) => {
	const span = transaction.startChild({ op: operationName })
	const result = functionToWatch(span)
	span.finish()
	return result
}

export const monitorAsync = async <T>(functionToWatch: (span: Span) => Promise<T>, operationName: string, transaction: Transaction | Span) => {
	const span = transaction.startChild({ op: operationName })
	await functionToWatch(span)
	span.finish()
}

export const monitorReturnAsync = async <T>(functionToWatch: (span: Span) => Promise<T>, operationName: string, transaction: Transaction | Span) => {
	const span = transaction.startChild({ op: operationName })
	const result = await functionToWatch(span)
	span.finish()
	return result
}
