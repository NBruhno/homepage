import { Card } from 'components/Card'
import { FormLogin } from 'components/Forms/Login'
import { PageContent } from 'components/Layout'
import { Page } from 'components/Layout/Page'
import type { NextPage } from 'next'
import Head from 'next/head'

const Login: NextPage = () => (
	<Page>
		<Head>
			<title>Login • Bruhno</title>
		</Head>
		<PageContent maxWidth={400} css={{ marginTop: '15vh' }}>
			<Card shouldAnimate={false}>
				<FormLogin />
			</Card>
		</PageContent>
	</Page>
)

export default Login
