import { NextApiRequest, NextApiResponse } from 'next'

import { login, logout, register, refresh } from 'server/routes/auth'

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
		default: res.status(404).end()
	}
}

export default auth
