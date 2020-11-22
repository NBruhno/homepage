import NextApp from 'next/app'
import Head from 'next/head'

import { sentryInit } from 'lib/sentryInit'

import { App } from 'containers/app'

sentryInit()

export default class MyApp extends NextApp {
	render() {
		// @ts-expect-error: Because of the current limitations of implementing Sentry with Next
		const { Component, pageProps, err } = this.props

		return (
			<>
				<Head>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
				</Head>
				<App>
					<Component {...pageProps} err={err} />
				</App>
			</>
		)
	}
}
