import { startTransaction } from '@sentry/nextjs'

export const transaction = startTransaction({
	op: 'test',
	name: 'API test',
	trimEnd: false,
})
