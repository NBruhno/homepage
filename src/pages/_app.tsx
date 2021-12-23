import NextApp from 'next/app'
import Head from 'next/head'

import { App } from 'containers/app'

export default class MyApp extends NextApp<{ err: Error }> {
	render() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { Component, pageProps, err } = this.props

		return (
			<>
				<Head>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='sentry-trace' content='{{ span.toSentryTrace() }}' />
				</Head>
				<App>
					<Component {...pageProps} err={err} />
				</App>
			</>
		)
	}
}
