import type { Environment } from 'types/Environment'

export const config = {
	sentry: {
		dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	},

	environment: process.env.NODE_ENV === 'test' ? 'development' : process.env.NODE_ENV as Environment,
}
