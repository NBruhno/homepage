import { game, games, follow, follows, unfollow, create, update, updateLibrary } from 'containers/api/games'
import { withSentry } from 'containers/api/middleware'
import { throwError } from 'containers/api/errors/ApiError'

export default withSentry(async (req, res, transaction) => {
	const { query: { route, following: followingQuery }, method } = req

	if (!route) { // /games
		if (followingQuery === 'true') return follows(req, res, { transaction })
		// if (searchQuery) return search(req, res, { transaction, search: searchQuery })
		switch (method) {
			case 'GET': return games(req, res, { transaction })
			case 'POST': return create(req, res, { transaction })
			default: throwError(405, res)
		}
	}

	const [gameId, resource] = route

	switch (resource) {
		case 'follow': { // /games/{id}/follow
			return follow(req, res, { gameId, transaction })
		}
		case 'unfollow': { // /games/{id}/unfollow
			return unfollow(req, res, { gameId, transaction })
		}
		default: { // /games/{id}
			if (resource) throwError(404, res)
			if (gameId === 'updateLibrary') return updateLibrary(req, res, { transaction })
			else {
				transaction.setName(`${method} - api/games/{gameId}`)
				switch (method) {
					case 'GET': return game(req, res, { gameId, transaction })
					case 'PATCH': return update(req, res, { gameId, transaction })
					default: throwError(405, res)
				}
			}
		}
	}
})
