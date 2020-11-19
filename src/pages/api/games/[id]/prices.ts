import { prices } from 'containers/api/games'
import { withSentry } from 'containers/api/middleware'

export default withSentry(async (req, res, transaction) => {
	const { query: { id }, method } = req
	const gameId = parseInt(id as string, 10)

	transaction.setName(`${method} - api/games/{gameId}/prices`)
	await prices(req, res, { gameId, transaction })
})
