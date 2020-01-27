import { NextPage } from 'next'
import Head from 'next/head'

import Page from 'components/Page'


const Static: NextPage = () => (
	<>
		<Head>
			<title>Bruhno</title>
		</Head>
		<Page>
			<p>Hello</p>
		</Page>
	</>
)

export default Static
