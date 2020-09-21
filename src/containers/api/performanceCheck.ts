import { Span, Transaction } from '@sentry/apm'

export const monitor =<T>(functionToWatch: (span: Span) => T, operationName: string, transaction: Transaction | Span) => {
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
