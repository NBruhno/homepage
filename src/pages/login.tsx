import { NextPage } from 'next'
import Head from 'next/head'

import { Page } from 'components/Page'
import { Card } from 'components/Card'
import { LoginForm } from 'components/Form/Login'

const Login: NextPage = () => (
	<>
		<Head>
			<title>Login • Bruhno</title>
		</Head>
		<Page>
			<Card shouldAnimate={false}>
				<LoginForm />
			</Card>
		</Page>
	</>
)

export default Login
