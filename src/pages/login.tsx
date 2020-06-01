import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { Page } from 'components/Page'
import { Form } from 'components/Form'
import { Card } from 'components/Card'
import { Input } from 'components/Fields'
import { ButtonSolid } from 'components/Buttons'

import useLogin from 'reducers/useLogin'
import useAuth from 'reducers/useAuth'

const Test: NextPage = () => {
	const { login, signUp, logout } = useLogin()
	const { user, userLoading } = useAuth()
	const [isExpanded, setIsExpanded] = useState(false)

	if (!userLoading) {
		console.log(user)
	}

	return (
		<>
			<Head>
				<title>Login • Bruhno</title>
			</Head>
			<Page>
				<button type='button' onClick={() => setIsExpanded(!isExpanded)}>Expand/Collapse</button>
				<Card isExpanded={isExpanded}>
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
					<h1>Sign-up form</h1>
					<ButtonSolid label='Logout' onClick={logout} />
				</Card>
			</Page>
		</>
	)
}

export default Test
