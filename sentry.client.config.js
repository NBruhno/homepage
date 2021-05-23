import * as Sentry from '@sentry/nextjs'
import { Integrations as TracingIntegrations } from '@sentry/tracing'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
	dsn: SENTRY_DSN,
	tracesSampleRate: 1,
	environment: process.env.VERCEL_ENV,
	integrations: [new TracingIntegrations.BrowserTracing({
		tracingOrigins: ['localhost', /(?:(?:\w*\.)?(?:bruhno(?:\.com|\.dev))|(?:\w*-)+(?:bruhno\.vercel\.app))/g],
	})],
})
