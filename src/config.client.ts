import type { Environment } from 'types/Environment'

const {
	NODE_ENV,
	NEXT_PUBLIC_SENTRY_DSN,
} = process.env

export const config = {
	sentry: {
		dsn: NEXT_PUBLIC_SENTRY_DSN,
	},

	environment: NODE_ENV === 'test' ? 'development' : NODE_ENV as Environment,
}
