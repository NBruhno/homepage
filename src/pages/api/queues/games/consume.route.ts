import { type AMQPClient, type AMQPMessage } from '@cloudamqp/amqp-client'
import { chunk, difference, uniq } from 'lodash'
import { array, create, defaulted, enums, object } from 'superstruct'

import { config } from 'config.server'

import { game as gameValidator } from 'validation/api'

import { apiHandler, createAmqp, gameFields, igdbFetcher, mapIgdbGame, prisma, redis } from 'lib/api'
import { filterUnspecified } from 'lib/filterUnspecified'
import { authenticateSystem } from 'lib/middleware'

const getMessagesFromQueue = async (client: AMQPClient, queue: string, limit = 500) => {
	const channel = await client.channel()
	const messages: Array<AMQPMessage> = []

	while (messages.length < limit) {
		const message = await channel.basicGet(queue, { noAck: false })
		if (message === null) break
		messages.push(message)
	}

	return messages
}

const Query = object({
	'queue-strategy': defaulted(enums(['amqp', 'redis']), config.queueStrategy),
})

export default apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		authenticateSystem(req)
		const { 'queue-strategy': queueStrategy } = create(req.query, Query)

		if (queueStrategy === 'amqp') {
			const amqp = await createAmqp()
			try {
				const [createRequests, updateRequests, deleteRequests] = await Promise.all([
					getMessagesFromQueue(amqp, 'game:create', 50),
					getMessagesFromQueue(amqp, 'game:update'),
					getMessagesFromQueue(amqp, 'game:delete'),
				])

				const [createdGames, updatedGames, deletedGames] = await Promise.all([
					(async () => {
						const toCreate = uniq(difference(createRequests, deleteRequests)).map((message) => message.bodyToString()!)

						if (toCreate.length > 0) {
							const games = create((await Promise.all(chunk(toCreate, 500).map(async (ids) => igdbFetcher('/games', res, {
								shouldReturnFirst: false,
								body: `${gameFields}; limit 500; where id = (${ids.join(',')});`,
								nickname: `outdated games, 0-500`,
							}).then((igdbGames) => igdbGames.map(mapIgdbGame))))).flat(), array(gameValidator))

							const result = prisma.games.createMany({ data: games, skipDuplicates: true })

							await Promise.all(createRequests.map(async (message) => message.ack()))
							return result
						}
						return { count: 0 }
					})(),
					(async () => {
						const updateRequestExists = uniq(difference(updateRequests, deleteRequests)).map((message) => prisma.games.findUnique({
							where: { id: parseInt(message.bodyToString()!, 10) },
							select: { id: true },
						}))

						if (updateRequestExists.length > 0) {
							const toUpdate = filterUnspecified(await prisma.$transaction(updateRequestExists)).map(({ id }) => id)

							const games = (await Promise.all(chunk(toUpdate, 500).map(async (ids) => igdbFetcher('/games', res, {
								shouldReturnFirst: false,
								body: `${gameFields}; limit 500; where id = (${ids.join(',')});`,
								nickname: `outdated games, 0-500`,
							}).then((igdbGames) => igdbGames.map(mapIgdbGame))))).flat()

							const updateQueries = games.map((game) => prisma.games.update({
								where: { id: game.id },
								data: game,
								select: { id: true, name: true },
							}))

							const result = await prisma.$transaction(updateQueries)
							await Promise.all(updateRequests.map(async (message) => message.ack()))

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

							const result = await prisma.$transaction(deleteQueries)
							await Promise.all(deleteRequests.map(async (message) => message.ack()))

							return result
						}
						return []
					})(),
				])

				return res.status(200).json({
					message: `Created ${createdGames.count} game${createdGames.count !== 1 ? 's' : ''}, updated ${updatedGames.length} game${updatedGames.length !== 1 ? 's' : ''} and deleted ${deletedGames.length} game${deletedGames.length !== 1 ? 's' : ''}.`,
					numberOfRequests: createRequests.length + updateRequests.length + deleteRequests.length,
					numberOfGameCreateRequests: createRequests.length,
					numberOfGameUpdateRequests: updateRequests.length,
					numberOfGameDeleteRequests: deleteRequests.length,
					createdGames,
					updatedGames,
					deletedGames,
				})
			} finally {
				await amqp.close()
			}
		} else {
			const changeRequests = await redis.hgetall('game')

			const { createRequests, updateRequests, deleteRequests } = Object.entries(changeRequests).reduce<{ createRequests: Array<number>, updateRequests: Array<number>, deleteRequests: Array<number> }>((requests, [stringId, type]): { createRequests: Array<number>, updateRequests: Array<number>, deleteRequests: Array<number> } => {
				const id = parseInt(stringId, 10)

				switch (type) {
					case 'create': return { ...requests, createRequests: [...requests.createRequests, id] }
					case 'update': return { ...requests, updateRequests: [...requests.updateRequests, id] }
					default: return { ...requests, deleteRequests: [...requests.deleteRequests, id] }
				}
			}, { createRequests: [], updateRequests: [], deleteRequests: [] })

			const [createdGames, updatedGames, deletedGames] = await Promise.all([
				(async () => {
					if (createRequests.length > 0) {
						const games = create((await Promise.all(chunk(createRequests, 500).map(async (ids) => igdbFetcher('/games', res, {
							shouldReturnFirst: false,
							body: `${gameFields}; limit 500; where id = (${ids.join(',')});`,
							nickname: `outdated games, 0-500`,
						}).then((igdbGames) => igdbGames.map(mapIgdbGame))))).flat(), array(gameValidator))

						const result = prisma.games.createMany({ data: games, skipDuplicates: true })

						await redis.hdel('game', ...createRequests.map((id) => id.toString()))
						return result
					}
					return { count: 0 }
				})(),
				(async () => {
					const updateRequestExists = uniq(difference(updateRequests, deleteRequests)).map((id) => prisma.games.findUnique({
						where: { id },
						select: { id: true },
					}))

					if (updateRequestExists.length > 0) {
						const toUpdate = filterUnspecified(await prisma.$transaction(updateRequestExists)).map(({ id }) => id)

						const games = (await Promise.all(chunk(toUpdate, 500).map(async (ids) => igdbFetcher('/games', res, {
							shouldReturnFirst: false,
							body: `${gameFields}; limit 500; where id = (${ids.join(',')});`,
							nickname: `outdated games, 0-500`,
						}).then((igdbGames) => igdbGames.map(mapIgdbGame))))).flat()

						const updateQueries = games.map((game) => prisma.games.update({
							where: { id: game.id },
							data: game,
							select: { id: true, name: true },
						}))

						const result = await prisma.$transaction(updateQueries)
						await redis.hdel('game', ...updateRequests.map((id) => id.toString()))

						return result
					}
					return []
				})(),
				(async () => {
					const deleteRequestExists = uniq(deleteRequests).map((id) => prisma.games.findUnique({
						where: { id },
						select: { id: true, name: true },
					}))

					if (deleteRequestExists.length > 0) {
						const toDelete = filterUnspecified(await prisma.$transaction(deleteRequestExists)).map(({ id }) => id)

						const deleteQueries = toDelete.map((id) => prisma.games.delete({
							where: { id },
							select: { id: true },
						}))

						const result = await prisma.$transaction(deleteQueries)
						await redis.hdel('game', ...deleteRequests.map((id) => id.toString()))

						return result
					}
					return []
				})(),
			])

			return res.status(200).json({
				message: `Created ${createdGames.count} game${createdGames.count !== 1 ? 's' : ''}, updated ${updatedGames.length} game${updatedGames.length !== 1 ? 's' : ''} and deleted ${deletedGames.length} game${deletedGames.length !== 1 ? 's' : ''}.`,
				numberOfRequests: changeRequests.length,
				numberOfGameCreateRequests: createRequests.length,
				numberOfGameUpdateRequests: updateRequests.length,
				numberOfGameDeleteRequests: deleteRequests.length,
				createdGames,
				updatedGames,
				deletedGames,
			})
		}
	})
