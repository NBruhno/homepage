import { authenticator } from 'otplib'

import twoFactorAuthentication from 'pages/api/users/[id]/2fa.route'
import user from 'pages/api/users/[id]/index.route'
import users from 'pages/api/users/index.route'
import login from 'pages/api/users/login.route'

import { decodeJwtToken } from 'lib/decodeJwtToken'
import { createCredentials, fetchFromServer } from 'lib/test'

type Props = {
	label?: string,
	email?: string,
	password?: string,
	username?: string,
	accessCode?: string,
	otp?: string,
	twoFactorSecret?: string,
	accessToken?: string,
}

export const userCreate = async (props: Props) => {
	const { email: defaultEmail, defaultPassword, username: defaultUsername, accessCode: defaultAccessCode } = createCredentials({ label: props.label })
	const {
		email = defaultEmail,
		password = defaultPassword,
		username = defaultUsername,
		accessCode = defaultAccessCode,
	} = props
	const { body, headers, status } = await fetchFromServer<{ accessToken: string }, { 'set-cookie': Array<string> }>({
		handler: users,
		method: 'post',
		path: '/api/users',
		body: { email, password, username, accessCode },
	})

	if (status === 409) {
		return { accessToken: undefined, refreshToken: undefined, intermediateToken: undefined }
	}

	const [refreshToken] = headers['set-cookie']
	const { accessToken } = body

	return { accessToken, refreshToken, intermediateToken: undefined }
}

export const userLogin = async (props: Props, { shouldSkipTwoFactor } = { shouldSkipTwoFactor: false }) => {
	const { email: defaultEmail, defaultPassword, username: defaultUsername, accessCode: defaultAccessCode, twoFactorSecret: defaultTwoFactorSecret } = createCredentials({ label: props.label })
	const {
		email = defaultEmail,
		password = defaultPassword,
		username = defaultUsername,
		accessCode = defaultAccessCode,
		twoFactorSecret = defaultTwoFactorSecret,
		otp,
	} = props
	const { body, headers, status } = await fetchFromServer<{ accessToken: string | undefined, intermediateToken: string | undefined }, { 'set-cookie': Array<string> }>({
		handler: login,
		method: 'post',
		path: '/api/users/login',
		body: { email, password: defaultPassword },
	})

	if (status === 200) {
		if (body.intermediateToken) {
			if (shouldSkipTwoFactor) {
				return { intermediateToken: body.intermediateToken, accessToken: undefined, refreshToken: undefined }
			} else {
				const { userId } = decodeJwtToken(body.intermediateToken)
				const { body: otpBody, headers: otpHeaders } = await fetchFromServer<{ accessToken: string }, { 'set-cookie': Array<string> }>({
					handler: twoFactorAuthentication,
					method: 'post',
					path: '/api/users/:userId/2fa',
					query: { id: userId },
					authToken: body.intermediateToken,
					body: { otp: otp ?? authenticator.generate(twoFactorSecret) },
				})
				return {
					refreshToken: otpHeaders['set-cookie'][0],
					accessToken: otpBody.accessToken,
					intermediateToken: undefined,
				}
			}
		} else if (body.accessToken) {
			return {
				refreshToken: headers['set-cookie'][0],
				accessToken: body.accessToken,
				intermediateToken: undefined,
			}
		}

		throw new Error('Failed to login test user', { cause: body })
	} else {
		return userCreate({ email, password, username, accessCode })
	}
}

export const userDelete = async (props: Props) => {
	const { email: defaultEmail, defaultPassword, username: defaultUsername, accessCode: defaultAccessCode } = createCredentials({ label: props.label })
	const {
		email = defaultEmail,
		password = defaultPassword,
		username = defaultUsername,
		accessCode = defaultAccessCode,
	} = props
	const { accessToken } = await userLogin({ email, password, username, accessCode })
	const { userId } = decodeJwtToken(accessToken!)

	await fetchFromServer<{ twoFactorSecret: string }>({
		path: '/api/users/:userId',
		query: { id: userId },
		method: 'delete',
		handler: user,
		authToken: accessToken,
	})
}

export const userEnableTwoFactor = async (props: Props) => {
	const { twoFactorSecret: defaultTwoFactorSecret } = createCredentials({ label: props.label })
	const { accessToken } = await userLogin(props)
	const { userId } = decodeJwtToken(accessToken!)

	await fetchFromServer({
		path: '/api/users/:userId/2fa',
		query: { id: userId },
		method: 'patch',
		handler: twoFactorAuthentication,
		authToken: accessToken,
		body: {
			otp: props.otp ?? authenticator.generate(props.twoFactorSecret ?? defaultTwoFactorSecret),
			secret: props.twoFactorSecret ?? defaultTwoFactorSecret,
		},
	})
}
