import { init, withScope, captureException } from '@sentry/browser'
import App from 'next/app'

import { StoreProvider } from 'lib/store'
import { Theme } from 'lib/theming'
import { config } from 'config.client'

import { Grid, Main, Footer, Navigation, Header, Shade } from 'components/Pages/App'
import { MainContent } from 'components/Pages/Layout/MainContent'

if (config.environment === 'production') {
	init({
		dsn: config.sentry.dsn,
	})
}

class MyApp extends App {
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo | any) {
		if (config.environment === 'production') {
			withScope((scope) => {
				Object.keys(errorInfo).forEach((key) => {
					scope.setExtra(key, errorInfo[key])
				})

				captureException(error)
			})

			super.componentDidCatch(error, errorInfo)
		}
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<StoreProvider>
				<Theme>
					<Grid>
						<Header />
						<MainContent>
							<Navigation />
							<Main>
								<Component {...pageProps} />
								<Shade />
							</Main>
						</MainContent>
						<Footer />
					</Grid>
				</Theme>
			</StoreProvider>
		)
	}
}

export default MyApp
