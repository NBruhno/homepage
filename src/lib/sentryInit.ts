import { RewriteFrames } from '@sentry/integrations'
import { init } from '@sentry/node'

/**
 * Function to initialize Sentry exception capturing. This function supports both client and server usage.
 * @example
 * ```tsx
 * sentryInit()
 * ```
 */
export const sentryInit = () => {
	if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
		const integrations = []

		if (process.env.NEXT_IS_SERVER === 'true' && process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR) {
			integrations.push(
				new RewriteFrames({
					iteratee: (frame) => {
						frame.filename = frame.filename.replace(process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR, 'app:///')
						frame.filename = frame.filename.replace('.next', '_next')
						return frame
					},
				}),
			)
		}

		init({
			enabled: process.env.NODE_ENV === 'production',
			integrations,
			dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
			release: process.env.NEXT_PUBLIC_COMMIT_SHA,
			tracesSampleRate: process.env.NEXT_IS_SERVER ? 1 : undefined,
		})
	}
}
