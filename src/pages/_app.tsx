import NextApp from 'next/app'
import Head from 'next/head'

import { App } from 'containers/app'

export default class MyApp extends NextApp<{ err: Error }> {
	render() {
		const { Component, pageProps, err } = this.props

		return (
			<>
				<Head>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='sentry-trace' content='{{ span.toTraceparent() }}' />
				</Head>
				<App>
					<Component {...pageProps} err={err} />
				</App>
			</>
		)
	}
}
