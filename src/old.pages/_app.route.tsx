/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { AppProps } from 'next/app'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Head from 'next/head'

import { usePage } from 'states/page'

import { PortalTarget } from 'components/Portal'

import { App } from './app'

type Props = AppProps & {
	err: Error | undefined,
}

const MyApp = ({ Component, pageProps, err }: Props) => {
	const title = usePage((state) => state.title)

	return (
		<>
			<PortalTarget />
			<Analytics />
			<SpeedInsights />
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='sentry-trace' content='{{ span.toSentryTrace() }}' />
				<title>{title}</title>
			</Head>
			<App>
				<Component {...pageProps} err={err} />
			</App>
		</>
	)
}

export default MyApp
