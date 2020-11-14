import { sendError } from 'containers/api/errors/ApiError'
import { unfollow, follow } from 'containers/api/games'
import { withSentry } from 'containers/api/middleware'

export default withSentry(async (req, res, transaction) => {
	const { query: { id }, method } = req
	const gameId = parseInt(id as string, 10)

	transaction.setName(`${method} - api/games/{gameId}/follow`)
	switch (method) {
		case 'GET':
		case 'POST': {
			await follow(req, res, { gameId, transaction })
			break
		}
		case 'PATCH': {
			await unfollow(req, res, { gameId, transaction })
			break
		}
		default: sendError(405, res)
	}
})
