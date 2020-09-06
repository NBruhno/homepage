import { NextApiRequest, NextApiResponse } from 'next'

import { login, user, users as apiUsers, twoFactorAuthentication, logout, refresh, changePassword } from 'containers/api/users'
import { withSentry } from 'containers/api/middleware'
import { ApiError } from 'containers/api/errors/ApiError'

interface Request extends NextApiRequest {
	query: {
		route: [userId: string, resource: string],
	}
}

const users = withSentry(async (req: Request, res: NextApiResponse) => {
	const { query: { route } } = req

	if (route) {
		const [userId, resource] = route
		switch (userId) {
			case 'login': return login(req, res)
			case 'refresh': return refresh(req, res)
			default: {
				if (resource) {
					switch (resource) {
						case '2fa': return twoFactorAuthentication(req, res, userId)
						case 'changePassword': return changePassword(req, res, userId)
						case 'logout': return logout(req, res)
						default: {
							const error = ApiError.fromCode(404)
							res.status(error.statusCode).json({ error: error.message })
							throw error
						}
					}
				}

				return user(req, res, userId)
			}
		}
	} else return apiUsers(req, res)
})

export default users
