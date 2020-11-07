import type { NextPage } from 'next'
import Head from 'next/head'

import { config } from 'config.client'

type Props = {
	userAgent?: string,
}

const Home: NextPage<Props> = () => (
	<>
		<Head>
			<title>Storybook • Bruhno</title>
		</Head>
		<div css={{ display: 'flex' }}>
			<iframe css={{ width: '100%' }} frameBorder={0} src={config.environment === 'development' ? 'http://localhost:9000' : `/storybook/index.html`} title='storybook' />
		</div>
	</>
)

export default Home
