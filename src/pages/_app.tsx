import React from 'react'
import App from 'next/app'


import { StoreProvider } from 'lib/store'

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		)
	}
}

export default MyApp
