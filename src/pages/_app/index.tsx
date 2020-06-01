import App from 'next/app'
import { StateInspector } from 'reinspect'
import { init, withScope, captureException } from '@sentry/browser'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import { StoreProvider, initialState } from 'lib/store'
import globalCss from 'styles/global'
import { theme } from 'styles/theme'
import { config } from 'config'

import { Body } from './Body'

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
			<StateInspector initialState={{ GLOBAL: { ...initialState } }} name='Bruhno'>
				<Global styles={globalCss} />
				<StoreProvider>
					<ThemeProvider theme={theme()}>
						<Body>
							<Component {...pageProps} />
						</Body>
					</ThemeProvider>
				</StoreProvider>
			</StateInspector>
		)
	}
}

export default MyApp
