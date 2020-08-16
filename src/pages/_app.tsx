import { RewriteFrames } from '@sentry/integrations'
import { init } from '@sentry/node'
import getConfig from 'next/config'
import Head from 'next/head'
import App from 'next/app'

import { config } from 'config.client'

import { StoreProvider } from 'lib/store'

import { Theme, Grid, Main, Navigation, Header } from 'containers/app'

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

class MyApp extends App {
	render() {
		// @ts-expect-error
		const { Component, pageProps, err } = this.props

		return (
			<>
				<Head>
					<meta name='viewport' content='width=device-width, initial-scale=1' />
				</Head>
				<StoreProvider>
					<Theme>
						<Grid>
							<Header />
							<Navigation />
							<Main>
								<Component {...pageProps} err={err} />
							</Main>
						</Grid>
					</Theme>
				</StoreProvider>
			</>
		)
	}
}

export default MyApp
