import { withSentry } from '@sentry/nextjs'
import { query as q, errors } from 'faunadb'
import { create, object, string, coerce, number } from 'superstruct'

import { monitorAsync, monitorReturnAsync } from 'lib/sentryMonitor'

import { authenticate } from 'api/middleware'
import { apiHandler, faunaClient, setCache } from 'api/utils'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

const handler = apiHandler({
	validMethods: ['GET', 'POST', 'PATCH'],
	cacheStrategy: 'NoCache',
	transactionName: (req) => `${req.method} api/games/{gameId}/follow`,
})
	.get(async (req, res) => {
		const { secret } = authenticate(req)
		const { id } = create(req.query, Query)
		const userData = await monitorReturnAsync(() => faunaClient(secret).query<{ data: { following: boolean } }>(
			q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [id, q.CurrentIdentity()])),
		).catch((error) => {
			if (error instanceof errors.NotFound) {
				return {
					data: {
						following: false,
					},
				}
			} else throw error
		}).then((response) => response.data), 'faunadb - Get()')
		setCache({ strategy: 'NoCache', res })
		res.status(200).json({ following: userData.following })
	})
	.post(async (req, res) => {
		const { secret } = authenticate(req)
		const { id } = create(req.query, Query)
		await monitorAsync(() => faunaClient(secret).query(
			q.Create(q.Collection('gamesUserData'), {
				data: {
					id,
					owner: q.CurrentIdentity(),
					following: true,
				},
			}),
		), 'faunadb - Create()').catch(async (error) => {
			if (error.description.includes('unique') && error instanceof errors.BadRequest) {
				await monitorAsync(() => faunaClient(secret).query(
					q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [id, q.CurrentIdentity()]))), {
						data: {
							following: true,
						},
					}),
				), 'faunadb - Update()')
			} else throw error
		})

		res.status(200).json({ message: 'Successfully followed the game' })
	})
	.patch(async (req, res) => {
		const { secret } = authenticate(req)
		const { id } = create(req.query, Query)
		await monitorReturnAsync(() => faunaClient(secret).query<{
			data: {
				id: string,
				owner: string,
				following: boolean,
			},
		}>(
			q.Update(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [id, q.CurrentIdentity()]))), {
				data: {
					following: false,
				},
			}),
		), 'faunadb - Update()').then(async (game) => {
			if (!game.data.following) {
				await monitorAsync(() => faunaClient(secret).query(
					q.Delete(q.Select(['ref'], q.Get(q.Match(q.Index('gamesUserDataByIdAndOwner'), [id, q.CurrentIdentity()])))),
				), 'faunadb - Delete()')
			}
		})

		res.status(200).json({ message: 'Successfully unfollowed the game' })
	})

export default withSentry(handler)
