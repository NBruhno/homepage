import { NextApiRequest, NextApiResponse } from 'next'

import { login, logout, register, refresh, twoFactorAuthentication } from 'server/routes/auth'
import { ApiError } from 'server/errors/ApiError'

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { route } } = req

	if (!route) {
		res.status(400).end()
		return
	}

	const [location] = route

	switch (location) {
		case 'login': {
			await login(req, res)
			break
		}
		case 'register': {
			await register(req, res)
			break
		}
		case 'logout': {
			await logout(req, res)
			break
		}
		case 'refresh': {
			await refresh(req, res)
			break
		}
		case '2fa': {
			await twoFactorAuthentication(req, res)
			break
		}
		default: {
			const error = ApiError.fromCode(405)
			res.status(error.statusCode).json({ error: error.message })
			throw error
		}
	}
}

export default auth
