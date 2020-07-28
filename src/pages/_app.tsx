import { init } from '@sentry/node'
import Head from 'next/head'
import App from 'next/app'

import { StoreProvider } from 'lib/store'
import { config } from 'config.client'

import { Theme, Grid, Main, Footer, Navigation, Header, Shade } from 'components/Pages/App'

if (config.sentry.dsn) {
	init({
		enabled: config.environment === 'production',
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
								<Shade />
								<Footer />
							</Main>
						</Grid>
					</Theme>
				</StoreProvider>
			</>
		)
	}
}

export default MyApp
