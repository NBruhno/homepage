import { NextPage } from 'next'
import Head from 'next/head'

import Page from 'components/Page'
import Form from 'components/Form'
import { Input } from 'components/Fields'
import useLogin from 'reducers/useLogin'
import useAuth from 'reducers/useAuth'

const Test: NextPage = () => {
	const { login, signUp, logout } = useLogin()
	const { user, userLoading } = useAuth()

	if (!userLoading) {
		console.log(user)
	}

	return (
		<>
			<Head>
				<title>Login • Bruhno</title>
			</Head>
			<Page>
				<h1>Login form</h1>
				<Form form='test' onSubmit={({ email, password }) => login({ email, password })}>
					<Input label='Email' name='email' type='email' required />
					<Input label='Password' name='password' type='password' required />
					<button type='submit'>Submit</button>
				</Form>
				<h1>Sign-up form</h1>
				<Form form='test' onSubmit={({ email, password }) => signUp({ email, password })}>
					<Input label='Email' name='email' type='email' required />
					<Input label='Password' name='password' type='password' required />
					<button type='submit'>Submit</button>
				</Form>
				<h1>Sign-up form</h1>
				<button onClick={logout} type='button'>Logout</button>
			</Page>
		</>
	)
}

export default Test
