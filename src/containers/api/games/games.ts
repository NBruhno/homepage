import { getUnixTime, sub } from 'date-fns'
import { query as q } from 'faunadb'
import type { NextApiResponse } from 'next'

// import { config } from 'config.server'

import type { SimpleGame } from 'types/Games'
// import type { Game as IGDBGame } from 'types/IGDB'

// import { absoluteUrl } from 'lib/absoluteUrl'
// import { fetcher, Method } from 'lib/fetcher'

import { serverClient } from '../faunaClient'
// import { monitorReturnAsync } from '../performanceCheck'
// import type { Options } from '../types'

// import { igdbFetcher, fields, mapIgdbGame, shouldUpdate } from './lib'
// import { igdbFetcher, fields, mapIgdbGame } from './lib'

export const games = async (res: NextApiResponse) => {
	// const { transaction } = options
	// const { query: { search } } = req

	// if (false) {
	// 	console.log(search, `Found a search query ${search}`)
	// 	games = await igdbFetcher<Array<IGDBGame>>('/games', res, {
	// 		body: `${fields}; limit 50; search "${search}";`,
	// 		nickname: 'popular',
	// 		span: transaction,
	// 	}).then((igdbGames) => igdbGames.map(mapIgdbGame))
	// } else {
	// 	games = await monitorReturnAsync(() => serverClient.query<{ data: Array<SimpleGame> }>(
	// 		q.Map(
	// 			q.Paginate(q.Range(q.Match(q.Index('gamesSortByHypeDescReleaseDateAsc')), ['', getUnixTime(sub(new Date(), { months: 2 }))], [0, '']), { size: 50 }),
	// 			q.Lambda(
	// 				['hype', 'releaseDate', 'name', 'id', 'cover', 'status', 'lastChecked', 'updatedAt', 'ref'],
	// 				{
	// 					id: q.Var('id'),
	// 					cover: q.Var('cover'),
	// 					hype: q.Var('hype'),
	// 					lastChecked: q.Var('lastChecked'),
	// 					name: q.Var('name'),
	// 					ref: q.Var('ref'),
	// 					releaseDate: q.Var('releaseDate'),
	// 					status: q.Var('status'),
	// 					updatedAt: q.Var('updatedAt'),
	// 				},
	// 			),
	// 		),
	// 	).then(({ data }) => data), 'faunadb - Map(Paginate(), Lambda())', transaction)
	// }

	const games = await serverClient.query<{ data: Array<SimpleGame> }>(
		q.Map(
			q.Paginate(q.Range(q.Match(q.Index('gamesSortByHypeDescReleaseDateAsc')), ['', getUnixTime(sub(new Date(), { months: 2 }))], [0, '']), { size: 50 }),
			q.Lambda(
				['hype', 'releaseDate', 'name', 'id', 'cover', 'status', 'lastChecked', 'updatedAt', 'ref'],
				{
					id: q.Var('id'),
					cover: q.Var('cover'),
					hype: q.Var('hype'),
					lastChecked: q.Var('lastChecked'),
					name: q.Var('name'),
					ref: q.Var('ref'),
					releaseDate: q.Var('releaseDate'),
					status: q.Var('status'),
					updatedAt: q.Var('updatedAt'),
				},
			),
		),
	).then(({ data }) => data)

	// if (!search) {
	// 	const gamesToUpdate = games.filter((game) => shouldUpdate(game))
	// 	if (gamesToUpdate.length > 0) {
	// 		fetcher(`/games`, {
	// 			absoluteUrl: absoluteUrl(req).origin,
	// 			accessToken: config.auth.systemToken,
	// 			body: { gamesToUpdate: gamesToUpdate.map(({ id }) => id) },
	// 			method: Method.Put,
	// 		})
	// 	}

	// 	if (games.some((game) => shouldUpdate(game))) {
	// 		fetcher(`/games`, {
	// 			absoluteUrl: absoluteUrl(req).origin,
	// 			accessToken: config.auth.systemToken,
	// 			method: Method.Patch,
	// 		})
	// 	}
	// }

	res.setHeader('Cache-Control', `s-maxage=${60 * 60}, stale-while-revalidate`)
	return res.status(200).json({ games })
}
