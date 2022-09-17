import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
	dsn: SENTRY_DSN as string,
	tracesSampler: (context) => {
		if (context.parentSampled) return true
		return 0.2
	},
	environment: process.env.VERCEL_ENV as string,
})
