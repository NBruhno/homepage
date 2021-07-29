import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions } from 'types'

import { getActiveTransaction } from '@sentry/tracing'
import { query as q, errors } from 'faunadb'

import { monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { createAndAttachError } from 'api/errors'
import { authenticate } from 'api/middleware'
import { faunaClient } from 'api/utils'

type Options = {
	gameId: number,
} & ApiOptions

export const follow = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method } = req
	const { gameId } = options
	const transaction = getActiveTransaction()
	if (transaction) transaction.setName(`${method} - api/games/{gameId}/follow`)

	res.setHeader('Cache-Control', 'no-cache')

	const { secret } = authenticate(req, res)

	switch (method) {
		case 'GET': {
			const userData = await monitorReturnAsync(() => faunaClient(secret).query<{ data: { following: boolean } }>(
				q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.CurrentIdentity()])),
			).catch((error) => {
				if (error instanceof errors.NotFound) {
					return {
						data: {
							following: false,
						},
					}
				} else throw error
			}).then((response) => response.data), 'faunadb - Get()')
			return res.status(200).json({ ...userData })
		}
		case 'POST': {
			await monitorAsync(() => faunaClient(secret).query(
				q.Create(q.Collection('gamesUserData'), {
					data: {
						id: gameId,
						owner: q.CurrentIdentity(),
						following: true,
					},
				}),
			), 'faunadb - Create()').catch(async (error) => {
				if (error.description.includes('unique') && error instanceof errors.BadRequest) {
					await monitorAsync(() => faunaClient(secret).query(
						q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [gameId, q.CurrentIdentity()]))), {
							data: {
								following: true,
							},
						}),
					), 'faunadb - Update()')
				} else throw error
			})

			return res.status(200).json({ message: 'Successfully followed the game' })
		}

		default: throw createAndAttachError(405, res)
	}
}
