export const config = {
	sentry: {
		dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	},

	environment: process.env.NEXT_PUBLIC_NODE_ENV,
}
