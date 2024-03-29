import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en' dir='ltr'>
				<Head>
					{/* General */}
					<base href='/' />
					<meta name='description' content="This is Nicolai Bruhn Lauritsen or more commonly known as Bruhno's personal website which functions as a portfolio and a playground." />
					<meta name='mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='msapplication-starturl' content='/' />
					<meta name='theme-color' content='hsl(216, 28%, 7%)' />

					{/* Twitter */}
					<meta name='twitter:card' content="This is Nicolai Bruhn Lauritsen or more commonly known as Bruhno's personal website which functions as a portfolio and a playground." />
					<meta name='twitter:site' content='@NBruhno' />
					<meta name='twitter:title' content='Homepage' />
					<meta name='twitter:description' content='Personal portfolio' />
					<meta name='twitter:image' content='https://bruhno.dev/images/BLight.svg' />

					{/* Facebook and other social sites */}
					<meta property='og:type' content='article' />
					<meta property='og:site_name' content='Bruhno' />
					<meta property='og:title' content='Homepage' />
					<meta property='og:description' content='Personal portfolio' />
					<meta property='og:image' content='https://static.bruhno.dev/images/BLight.svg' />
					<meta property='og:url' content='https://static.bruhno.dev' />

					{/* Refs */}
					<link rel='manifest' href='/manifest.json' />
					<link rel='icon' type='image/x-icon' href='favicon.ico' />
					<link rel='icon' type='image/png' sizes='192x192' href='favicon.png' />
					{/* eslint-disable-next-line react/no-invalid-html-attribute */}
					<link rel='apple-touch-icon' href='favicon.png' />
				</Head>
				<body>
					<Main />
					<noscript>
						{/* This CSS is only included for showing a warning when JS is disabled */}
						{/* eslint-disable-next-line @next/next/no-css-tags */}
						<link rel='stylesheet' type='text/css' href='noScript.css' />
						<div className='noScript'>You&apos;ve disabled JavaScript, so a lot of things <b>will not work</b>. This website is not designed to function without JavaScript, <b>please respect that</b>.</div>
					</noscript>
					<NextScript />
				</body>
			</Html>
		)
	}
}
