import { NextPage } from 'next'
import Head from 'next/head'

import { useAuth } from 'reducers/auth'

import { Page } from 'components/Page'
import { Form } from 'components/Form'
import { Card } from 'components/Card'
import { Input } from 'components/Fields'
import { ButtonSolid } from 'components/Buttons'

const Login: NextPage = () => {
// const { data: user, error } = useSWR('/api/auth/profile', fetcher, { revalidateOnFocus: false, shouldRetryOnError: false })
	const { signUp, login, logout } = useAuth()

	return (
		<>
			<Head>
				<title>Login • Bruhno</title>
			</Head>
			<Page>
				{/* <h1>{user?.id}</h1> */}
				<Card>
					<h1>Login form</h1>
					<Form form='test' onSubmit={({ email, password }) => login({ email, password })}>
						<Input label='Email' name='email' type='email' required />
						<Input label='Password' name='password' type='password' required />
						<ButtonSolid label='Login' submit />
					</Form>
				</Card>
				<Card>
					<h1>Sign-up form</h1>
					<Form form='test' onSubmit={({ email, password }) => signUp({ email, password })}>
						<Input label='Email' name='email' type='email' required />
						<Input label='Password' name='password' type='password' required />
						<ButtonSolid label='Sign-up' submit />
					</Form>
				</Card>
				<Card>
					<h1>Logout</h1>
					<ButtonSolid label='Logout' onClick={logout} />
				</Card>
			</Page>
		</>
	)
}

export default Login
