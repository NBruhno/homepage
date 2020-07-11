import { NextPage } from 'next'
import Head from 'next/head'

import { Page } from 'components/Pages/Layout/Page'

import { FormTest } from 'components/Forms/Test'

const Test: NextPage = () => (
	<Page>
		<Head>
			<title>Test • Bruhno</title>
		</Head>
		<FormTest />
	</Page>
)

export default Test
