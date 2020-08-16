import { NextApiRequest, NextApiResponse } from 'next'

import { login, logout, register, refresh, twoFactorAuthentication, check, changePassword, deleteUser } from 'containers/api/auth'
import { withSentry } from 'containers/api/middleware'
import { ApiError } from 'containers/api/errors/ApiError'

const auth = withSentry(async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { route } } = req

	if (!route) { // /auth
		res.status(400).end()
		return
	}

	const [location] = route

	switch (location) {
		case 'login': { // /auth/login
			await login(req, res)
			break
		}
		case 'changePassword': { // /auth/changePassword
			await changePassword(req, res)
			break
		}
		case 'register': { // /auth/register
			await register(req, res)
			break
		}
		case 'logout': { // /auth/logout
			await logout(req, res)
			break
		}
		case 'refresh': { // /auth/refresh
			await refresh(req, res)
			break
		}
		case '2fa': { // /auth/2fa
			await twoFactorAuthentication(req, res)
			break
		}
		case 'check': { // /auth/check
			await check(req, res)
			break
		}
		case 'delete': { // /auth/delete
			await deleteUser(req, res)
			break
		}
		default: {
			const error = ApiError.fromCode(404)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
})

export default auth
