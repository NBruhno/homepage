import { RewriteFrames } from '@sentry/integrations'
import { init } from '@sentry/node'
import NextApp from 'next/app'
import getConfig from 'next/config'
import Head from 'next/head'

import { config } from 'config.client'

import { App } from 'containers/app'

if (config.sentry.dsn) {
	const nextConfig = getConfig()
	const distDir = `${nextConfig.serverRuntimeConfig.rootDir}/.next`
	init({
		enabled: config.environment === 'production',
		integrations: [
			new RewriteFrames({
				iteratee: (frame) => {
					frame.filename = frame.filename.replace(distDir, 'app:///_next')
					return frame
				},
			}),
		],
		dsn: config.sentry.dsn,
	})
}

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
