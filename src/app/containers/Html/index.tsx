import { InterfaceStore } from 'redux/InterfaceStore'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import * as serialize from 'serialize-javascript'

interface HtmlProps {
	manifest?: any
	markup?: string
	store?: Redux.Store<InterfaceStore>
}

class Html extends React.Component<HtmlProps, {}> {
	public render() {
		const head = Helmet.rewind()
		const { markup, store } = this.props

		const styles = this.resolve(['vendor.css', 'app.css'])
		const renderStyles = styles.map((src, i) => <link key={i} rel="stylesheet" type="text/css" href={src} />)

		const scripts = this.resolve(['vendor.js', 'app.js'])
		const renderScripts = scripts.map((src, i) => <script src={src} key={i} />)

		// tslint:disable-next-line:max-line-length
		const initialState = <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${serialize(store.getState(), { isJSON: true })};` }} charSet="UTF-8" />

		return (
			<html>
				<head>
					{head.base.toComponent()}
					{head.title.toComponent()}
					{head.meta.toComponent()}
					{head.link.toComponent()}
					{head.script.toComponent()}

					{renderStyles}
					<link rel="shortcut icon" href="/favicon.ico" />
				</head>
				<body>
					<main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
					{initialState}
					{renderScripts}
				</body>
			</html>
		)
	}

	private resolve(files: any) {
		return files
			.map((src) => {
				if (!this.props.manifest[src]) {
					return
				}
				return '/public/' + this.props.manifest[src]
			})
			.filter((file) => file !== undefined)
	}
}

export { Html }
