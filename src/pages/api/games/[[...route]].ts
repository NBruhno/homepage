import { NextApiRequest, NextApiResponse } from 'next'

import { game, gameList, follow, unfollow } from 'containers/api/games'
import { withSentry } from 'containers/api/middleware'
import { ApiError } from 'containers/api/errors/ApiError'

const auth = withSentry(async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { route } } = req

	if (!route) { // /games
		await gameList(req, res)
		return
	}

	const [gameId, resource] = route

	switch (resource) {
		case 'follow': { // /games/{id}/follow
			await follow(req, res, gameId)
			break
		}
		case 'unfollow': { // /games/{id}/unfollow
			await unfollow(req, res, gameId)
			break
		}
		default: { // /games/{id}
			if (resource) {
				const error = ApiError.fromCode(404)
				res.status(error.statusCode).json({ error: error.message })
				throw error
			} else {
				await game(req, res, gameId)
			}
		}
	}
})

export default auth
