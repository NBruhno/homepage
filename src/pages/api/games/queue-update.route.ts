import { type AMQPMessage } from '@cloudamqp/amqp-client'
import { chunk, difference, uniq } from 'lodash'
import { create, object, number, type as optionalObject, StructError } from 'superstruct'

import { config } from 'config.server'

import { apiHandler, createAmqp, gameFields, igdbFetcher, mapIgdbGame, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { filterUnspecified } from 'lib/filterUnspecified'
import { authenticateSystem } from 'lib/middleware'

const deleteValidator = object({
	id: number(),
})

const updateValidator = optionalObject({
	id: number(),
})

export default apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		authenticateSystem(req)
		const amqp = await createAmqp()
		const updateRequests: Array<AMQPMessage> = []
		const deleteRequests: Array<AMQPMessage> = []
		await amqp.channel.basicConsume('game:update', { noAck: false }, async (message) => {
			if (message.body === null) {
				return message.reject()
			}
			return updateRequests.push(message)
		})
		await amqp.channel.basicConsume('game:delete', { noAck: false }, async (message) => {
			if (message.body === null) {
				return message.reject()
			}
			return deleteRequests.push(message)
		})

		const [updatedGames, deletedGames] = await Promise.all([
			(async () => {
				const updateRequestExists = uniq(difference(updateRequests, deleteRequests)).map((message) => prisma.games.findUnique({
					where: { id: parseInt(message.bodyToString()!, 10) },
					select: { id: true },
				}))

				if (updateRequestExists.length > 0) {
					const toUpdate = filterUnspecified(await prisma.$transaction(updateRequestExists)).map(({ id }) => id)

					const games = (await Promise.all(chunk(toUpdate, 100).map(async (ids) => igdbFetcher('/games', res, {
						shouldReturnFirst: false,
						body: `${gameFields}; limit 100; where id = (${ids.join(',')});`,
						nickname: `outdated games, 0-100`,
					}).then((igdbGames) => igdbGames.map(mapIgdbGame))))).flat()

					const updateQueries = games.map(({ id, ...rest }) => prisma.games.update({
						where: { id },
						data: { ...rest, updatedAt: undefined },
						select: { id: true, name: true },
					}))

					const [result] = await Promise.all([
						prisma.$transaction(updateQueries),
						...updateRequests.map(async (message) => message.ack()),
					])

					return result
				}
				return []
			})(),
			(async () => {
				const deleteRequestExists = uniq(deleteRequests).map((message) => prisma.games.findUnique({
					where: { id: parseInt(message.bodyToString()!, 10) },
					select: { id: true, name: true },
				}))

				if (deleteRequestExists.length > 0) {
					const toDelete = filterUnspecified(await prisma.$transaction(deleteRequestExists)).map(({ id }) => id)

					const deleteQueries = toDelete.map((id) => prisma.games.delete({
						where: { id },
						select: { id: true },
					}))

					const [result] = await Promise.all([
						prisma.$transaction(deleteQueries),
						...updateRequests.map(async (message) => message.ack()),
					])

					return result
				}
				return []
			})(),
		])

		await amqp.client.close()

		return res.status(200).json({
			message: `Updated ${updatedGames.length} game(s) and deleted ${deletedGames.length} game(s).`,
			updatedGames,
			deletedGames,
		})
	})
	.post(async (req, res) => {
		if (req.headers['x-secret'] !== config.igdb.webhookSecret) throw ApiError.fromCodeWithCause(401, new Error(`Invalid secret`))
		const amqp = await createAmqp()

		let updateRequest: { id: number } | null = null
		let typeOfRequest: 'delete' | 'update' = 'delete'
		try {
			updateRequest = create(req.body, deleteValidator)
		} catch (error) {
			if (error instanceof StructError) {
				updateRequest = create(req.body, updateValidator)
				typeOfRequest = 'update'
			} else {
				throw error
			}
		}

		await amqp.channel.queue(`game:${typeOfRequest}`, { durable: true })
		await amqp.channel.basicPublish('', `game:${typeOfRequest}`, updateRequest.id.toString(), {})
		await amqp.client.close()

		return res.status(200).json({ message: `Added ${typeOfRequest} request for game with ID ${updateRequest.id} to queue.` })
	})
