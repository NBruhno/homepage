import type { Infer } from 'superstruct'

import Link from 'next/link'
import { object, size } from 'superstruct'

import { useAuth } from 'states/users'

import { fieldEmail, fieldPassword, fieldString, fieldUsername } from 'validation/fields'

import { ButtonSolid, ButtonBorder } from 'components/Buttons'
import { Form } from 'components/Form'
import { Input } from 'components/FormFields'

import { Subtitle, Title } from './Shared'

const loginSchema = object({
	email: fieldEmail(),
	password: fieldString(),
})

const registerSchema = object({
	accessCode: fieldString(),
	email: fieldEmail(),
	username: fieldUsername(),
	password: fieldPassword(),
})

const twoFactorModel = object({
	otp: size(fieldString(), 6, 6),
})

export type LoginModel = Infer<typeof loginSchema>
export type RegisterModel = Infer<typeof registerSchema>
export type TwoFactorModel = Infer<typeof twoFactorModel>

export const FormLogin = () => {
	const { onLogin, onRegister, onVerify2fa, onLogout, currentFlow, setCurrentFlow } = useAuth()

	switch (currentFlow) {
		case 'login': return (
			<>
				<Title>Welcome back</Title>
				<Form<LoginModel>
					name={currentFlow}
					schema={loginSchema}
					onSubmit={async (fields) => { await onLogin(fields) }}
					render={(({ name }) => (
						<>
							<Input label='Email' name={name('email')} type='email' isRequired autoComplete='email' />
							<Input label='Password' name={name('password')} type='password' isRequired autoComplete='password' />
							<div css={(theme) => ({
								display: 'flex',
								justifyContent: 'space-between',

								[theme.mediaQueries.maxMobile]: {
									flexDirection: 'column-reverse',
								},
							})}
							>
								<ButtonBorder label='Sign up instead' onClick={() => setCurrentFlow('register')} />
								<ButtonSolid
									label='Login'
									type='submit'
									css={(theme) => ({
										[theme.mediaQueries.maxMobile]: {
											width: '100%',
											marginBottom: '12px',
										},
									})}
								/>
							</div>
						</>
					))}
				/>
			</>
		)
		case 'register': return (
			<>
				<Title>Sign up</Title>
				<Form<RegisterModel>
					name={currentFlow}
					schema={registerSchema}
					onSubmit={async (fields) => { await onRegister(fields) }}
					render={(({ name }) => (
						<>
							<Input label='Access code' name={name('accessCode')} type='text' isRequired />
							<Input label='Email' name={name('email')} type='email' isRequired autoComplete='email' />
							<Input label='Display name' name={name('username')} type='username' isRequired autoComplete='username' />
							<Input label='Password' name={name('password')} type='password' isRequired autoComplete='password' />
							<Link href='/privacy-policy' passHref>
								<a css={{ textDecoration: 'none' }}>By creating an account you confirm that you have read and accepted our Privacy Policy</a>
							</Link>
							<div css={(theme) => ({
								marginTop: '24px',
								display: 'flex',
								justifyContent: 'space-between',

								[theme.mediaQueries.maxMobile]: {
									flexDirection: 'column-reverse',
								},
							})}
							>
								<ButtonBorder label='Go back' onClick={() => setCurrentFlow('login')} />
								<ButtonSolid
									label='Sign up'
									type='submit'
									css={(theme) => ({
										[theme.mediaQueries.maxMobile]: {
											width: '100%',
											marginBottom: '12px',
										},
									})}
								/>
							</div>
						</>
					))}
				/>
			</>
		)
		case '2fa': return (
			<>
				<Title>Two-Factor Authentication</Title>
				<Subtitle>Submit your code generated by your authenticator</Subtitle>
				<Form<TwoFactorModel>
					name={currentFlow}
					schema={twoFactorModel}
					onSubmit={async (fields) => { await onVerify2fa(fields) }}
					render={({ name }) => (
						<>
							<Input label='One time password' name={name('otp')} isRequired autoComplete='otp' />
							<ButtonSolid label='Verify code' type='submit' isFullWidth />
						</>
					)}
				/>
			</>
		)
		case 'loggedIn': return (
			<div>
				<Title>You are already logged in</Title>
				<Subtitle />
				<ButtonSolid label='Logout' onClick={async () => { await onLogout() }} isFullWidth />
			</div>
		)
		default: return null
	}
}
