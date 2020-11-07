import { throwError } from 'containers/api/errors/ApiError'
import { withSentry } from 'containers/api/middleware'
import { login, user, users, twoFactorAuthentication, logout, refresh, changePassword } from 'containers/api/users'

export default withSentry(async (req, res, transaction) => {
	const { query: { route } } = req

	res.setHeader('Cache-Control', 'no-cache')

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
						default: throwError(404, res)
					}
				}

				return user(req, res, { transaction, userId })
			}
		}
	} else return users(req, res, { transaction })
})
