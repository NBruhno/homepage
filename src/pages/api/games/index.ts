import { sendError } from 'containers/api/errors/ApiError'
import { games, follows, updateLibrary } from 'containers/api/games'
import { withSentry } from 'containers/api/middleware'

export default withSentry(async (req, res, transaction) => {
	const { query: { user }, method } = req

	switch (method) {
		case 'GET': {
			if (user) return follows(req, res, { transaction })
			await games(req, res, { transaction })
			break
		}
		case 'PATCH':
		case 'PUT':
		case 'POST': {
			await updateLibrary(req, res, { transaction })
			break
		}
		default: sendError(405, res)
	}
})
