import React from 'react'
import App from 'next/app'
import { StateInspector } from 'reinspect'

import { StoreProvider, initialState } from 'lib/store'

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<StateInspector initialState={{ GLOBAL: { ...initialState } }} name='Bruhno'>
				<StoreProvider>
					<Component {...pageProps} />
				</StoreProvider>
			</StateInspector>
		)
	}
}

export default MyApp
