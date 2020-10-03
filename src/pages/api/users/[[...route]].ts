import { NextApiRequest } from 'next'

import { login, user, users, twoFactorAuthentication, logout, refresh, changePassword } from 'containers/api/users'
import { withSentry } from 'containers/api/middleware'
import { ApiError } from 'containers/api/errors/ApiError'

interface Request extends NextApiRequest {
	query: {
		route: [userId: string, resource: string],
	}
}

export default withSentry(async (req: Request, res, transaction) => {
	const { query: { route } } = req

	if (route) {
		const [userId, resource] = route
		switch (userId) {
			case 'login': return login(req, res, { transaction })
			case 'refresh': return refresh(req, res, { transaction })
			default: {
				if (resource) {
					switch (resource) {
						case '2fa': return twoFactorAuthentication(req, res, { transaction, userId })
						case 'changePassword': return changePassword(req, res, { transaction, userId })
						case 'logout': return logout(req, res, { transaction })
						default: {
							const error = ApiError.fromCode(404)
							res.status(error.statusCode).json({ error: error.message })
							throw error
						}
					}
				}

				return user(req, res, { transaction, userId })
			}
		}
	} else return users(req, res, { transaction })
})
