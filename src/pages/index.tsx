import type { NextPage } from 'next'

import Head from 'next/head'

import { Page } from 'components/Layout/Page'
import { Logo } from 'components/Logo'

type Props = {
	userAgent?: string,
}

const Home: NextPage<Props> = () => (
	<>
		<Head>
			<title>Bruhno</title>
		</Head>
		<Page css={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
			<div css={{ textAlign: 'center' }}>
				<Logo css={{ height: '37vh' }} />
				<h1 css={{ fontWeight: 400, fontSize: '3em', marginBottom: '14px' }}>Bruhno</h1>
				<p css={(theme) => ({
					fontWeight: theme.font.weight.regular,
					fontSize: theme.font.size.s100,
					margin: 0,
					fontFamily: theme.font.family.poppins,
				})}
				>
					Personal portfolio of Nicolai Bruhn Lauritsen
				</p>
			</div>
		</Page>
	</>
)

export default Home
