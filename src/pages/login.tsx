import { NextPage } from 'next'
import Head from 'next/head'

import { useAuth } from 'reducers/auth'

import { Page } from 'components/Page'
import { Form } from 'components/Form'
import { Card } from 'components/Card'
import { Input } from 'components/Fields'
import { ButtonSolid } from 'components/Buttons'

const Login: NextPage = () => {
	const { register, login, logout, verify2fa } = useAuth()

	return (
		<>
			<Head>
				<title>Login • Bruhno</title>
			</Head>
			<Page>
				<Card shouldAnimate={false}>
					<h1>Login form</h1>
					<Form form='login' onSubmit={({ email, password }) => login({ email, password })}>
						<Input label='Email' name='email' type='email' id='loginEmail' required />
						<Input label='Password' name='password' type='password' id='loginPassword' required />
						<ButtonSolid label='Login' submit />
					</Form>
				</Card>
				<Card shouldAnimate={false}>
					<h1>2FA form</h1>
					<Form form='2fa' onSubmit={({ otp }) => verify2fa({ otp })}>
						<Input label='One time password' name='otp' type='text' id='2faOtp' required />
						<ButtonSolid label='Login' submit />
					</Form>
				</Card>
				<Card shouldAnimate={false}>
					<h1>Sign-up form</h1>
					<Form form='register' onSubmit={({ email, password }) => register({ email, password })}>
						<Input label='Email' name='email' type='email' id='registerEmail' required />
						<Input label='Password' name='password' type='password' id='registerPassword' required />
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
