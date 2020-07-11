import { ButtonSolid, ButtonText } from 'components/Buttons'
import { Title, Subtitle } from 'components/Pages/Login'

import { useAuth } from 'reducers/auth'

import { Input } from './Fields/Input'
import { Form } from '.'

export const FormLogin = () => {
	const { user, login, register, userInfo, check, verify2fa, logout, setUserInfo } = useAuth()

	if (user.accessToken) {
		return (
			<div>
				<Title>You are already logged in</Title>
				<Subtitle />
				<ButtonSolid label='Logout' onClick={() => logout()} fullWidth />
			</div>
		)
	}

	if (user.intermediateToken) {
		const formName = 'register'
		return (
			<>
				<Title>Two-Factor Authentication</Title>
				<Subtitle>Submit your code generated by your authenticator app</Subtitle>
				<Form form={formName} onSubmit={async (fields) => verify2fa(fields)}>
					<Input label='One time password' name='otp' id={`${formName}-otp`} required />
					<ButtonSolid label='Verify code' submit fullWidth />
				</Form>
			</>
		)
	}

	if (userInfo === null) {
		const formName = 'check'
		return (
			<>
				<Title>Sign in</Title>
				<Subtitle>Lets find you</Subtitle>
				<Form form={formName} onSubmit={async ({ email }) => check({ email })}>
					<Input label='Email' name='email' type='email' id={`${formName}-email`} required />
					<ButtonSolid label='Submit' submit fullWidth />
				</Form>
			</>
		)
	}

	if (userInfo?.exists) {
		const formName = 'login'
		return (
			<>
				<Title>Welcome back</Title>
				<Form form={formName} onSubmit={async (fields) => login(fields)} initialValues={{ email: userInfo.email }}>
					<Input label='Email' name='email' type='email' id={`${formName}-email`} required />
					<Input label='Password' name='password' type='password' id={`${formName}-password`} required />
					<ButtonSolid label='Sign in' submit fullWidth />
				</Form>
			</>
		)
	}

	if (!userInfo?.exists && userInfo?.email) {
		const formName = 'register'
		return (
			<>
				<Title>User not found</Title>
				<Subtitle>Want to sign up instead?</Subtitle>
				<div css={{ margin: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
					<ButtonText label='No, go back' onClick={() => setUserInfo(null)} />
				</div>
				<Form form={formName} onSubmit={async (fields) => register(fields)} initialValues={{ email: userInfo.email }}>
					<Input label='Email' name='email' type='email' id={`${formName}-email`} required />
					<Input label='Password' name='password' type='password' id={`${formName}-password`} required />
					<ButtonSolid label='Sign up' submit fullWidth />
				</Form>
			</>
		)
	}

	return null
}
