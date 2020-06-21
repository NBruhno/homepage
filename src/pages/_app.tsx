import { Global } from '@emotion/core'
import { init, withScope, captureException } from '@sentry/browser'
import { ThemeProvider } from 'emotion-theming'
import App from 'next/app'

import { StoreProvider } from 'lib/store'
import { globalCss } from 'styles/global'
import { theme } from 'styles/theme'
import { config } from 'config'

import { Grid, Navigation, Main, Footer } from 'components/Page'

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
				<Global styles={globalCss} />
				<ThemeProvider theme={theme()}>
					<Grid>
						<Navigation>
							<p>Navigation here</p>
						</Navigation>
						<Main>
							<Component {...pageProps} />
						</Main>
						<Footer>
							<p>Footer here</p>
						</Footer>
					</Grid>
				</ThemeProvider>
			</StoreProvider>
		)
	}
}

export default MyApp
