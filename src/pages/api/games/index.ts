import { sendError } from 'containers/api/errors/ApiError'
import { games, follows, updateLibrary } from 'containers/api/games'
import { withSentry } from 'containers/api/middleware'

export default withSentry(async (req, res, transaction) => {
	const { query: { following: followingQuery }, method } = req

	if (followingQuery === 'true') return follows(req, res, { transaction })
	switch (method) {
		case 'GET': return games(res)
		case 'PATCH':
		case 'PUT':
		case 'POST': return updateLibrary(req, res, { transaction })
		default: sendError(405, res)
	}
})
