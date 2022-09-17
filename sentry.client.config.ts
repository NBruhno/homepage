import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
	dsn: SENTRY_DSN as string,
	tracesSampler: (context) => {
		if (context.transactionContext.op === 'pageload') return 0.2
		return 0.5
	},
	environment: process.env.VERCEL_ENV as string,
})
