import { RewriteFrames } from '@sentry/integrations'
import { init } from '@sentry/node'

const {
	NEXT_IS_SERVER,
	NEXT_PUBLIC_COMMIT_SHA,
	NEXT_PUBLIC_SENTRY_DSN, NODE_ENV,
	NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
} = process.env

/**
 * Function to initialize Sentry exception capturing. This function supports both client and server usage.
 * @example
 * ```tsx
 * sentryInit()
 * ```
 */
export const sentryInit = () => {
	if (NEXT_PUBLIC_SENTRY_DSN) {
		const integrations = []

		if (NEXT_IS_SERVER === 'true' && NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR) {
			integrations.push(
				new RewriteFrames({
					iteratee: (frame) => {
						frame.filename = frame.filename.replace(NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR, 'app:///')
						frame.filename = frame.filename.replace('.next', '_next')
						return frame
					},
				}),
			)
		}

		init({
			enabled: NODE_ENV === 'production',
			integrations,
			dsn: NEXT_PUBLIC_SENTRY_DSN,
			release: NEXT_PUBLIC_COMMIT_SHA,
			tracesSampleRate: NEXT_IS_SERVER ? 1 : undefined,
		})
	}
}
