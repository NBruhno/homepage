import { NextApiRequest, NextApiResponse } from 'next'

import { game, gameList, cover, coverList, involved, involvedList } from 'server/routes/games'

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
	const { query: { route } } = req

	if (!route) {
		await gameList(req, res)
		return
	}

	const [gameId, resource, resourceId] = route

	switch (resource) {
		case 'covers': {
			switch (resourceId) {
				case 'list': {
					await coverList(req, res)
					break
				}
				default: {
					await cover(req, res, resourceId)
					break
				}
			}
			break
		}
		case 'involved': {
			switch (resourceId) {
				case 'list': {
					await involvedList(req, res, resourceId)
					break
				}
				default: {
					await involved(req, res, resourceId)
					break
				}
			}
			break
		}
		default: {
			await game(req, res, gameId)
		}
	}
}

export default auth
