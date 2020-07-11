import { NextApiRequest, NextApiResponse } from 'next'

import { game, gameList, cover, coverList, involved, involvedList } from 'server/routes/games'

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { route } } = req

	if (!route) { // /games
		await gameList(req, res)
		return
	}

	const [gameId, resource, resourceId] = route

	switch (resource) {
		case 'covers': { // /games/{id}/covers
			switch (resourceId) { // /games/{id}/covers/list
				case 'list': {
					await coverList(req, res)
					break
				}
				default: { // /games/{id}/covers/{id}
					await cover(req, res, resourceId)
					break
				}
			}
			break
		}
		case 'involved': { // /games/{id}/involved
			switch (resourceId) {
				case 'list': { // /games/{id}/involved/list
					await involvedList(req, res, resourceId)
					break
				}
				default: { // /games/{id}/involved/{id}
					await involved(req, res, resourceId)
					break
				}
			}
			break
		}
		default: { // /games/{id}
			await game(req, res, gameId)
		}
	}
}

export default auth
