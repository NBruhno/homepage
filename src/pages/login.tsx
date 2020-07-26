import { NextPage } from 'next'
import Head from 'next/head'

import { Page } from 'components/Pages/Layout/Page'
import { Card } from 'components/Card'
import { FormLogin } from 'components/Forms/Login'

const Login: NextPage = () => (
	<Page>
		<Head>
			<title>Login • Bruhno</title>
		</Head>
		<div css={{ maxWidth: '420px', margin: '0 auto' }}>
			<Card shouldAnimate={false}>
				<FormLogin />
			</Card>
		</div>
	</Page>
)

export default Login
