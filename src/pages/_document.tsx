import Document, { Html, Head, Main, NextScript } from 'next/document'

class _document extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang='en'>
				<Head />
				<link rel='manifest' href='/manifest.json' />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default _document
