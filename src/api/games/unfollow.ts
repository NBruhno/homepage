import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'

import { query as q, errors } from 'faunadb'

import { monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { authenticate } from 'api/middleware'
import { faunaClient } from 'api/utils'

type Options = {
	gameId: number,
} & ApiOptions

export const unfollow = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { gameId, transaction } = options
	transaction.setName(`${method} - api/games/{gameId}/unfollow`)

	const { secret } = authenticate(req, res, { transaction })

	switch (method) {
		case 'PATCH': {
			await monitorReturnAsync(() => faunaClient(secret, transaction).query<{
				data: {
					id: string,
					owner: string,
					following: boolean,
				},
			}>(
				q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.CurrentIdentity()]))), {
					data: {
						following: false,
					},
				}),
			), 'faunadb - Update()', transaction).then(async (game) => {
				if (!game.data.following) {
					await monitorAsync(() => faunaClient(secret, transaction).query(
						q.Delete(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.CurrentIdentity()])))),
					), 'faunadb - Delete()', transaction)
				}
			}).catch((error) => {
				if (error instanceof errors.NotFound) throw createAndAttachError(404, res)
				else throw error
			})

			res.status(200).json({ message: 'Successfully unfollowed the game' })
			break
		}

		default: throw createAndAttachError(405, res)
	}
}
