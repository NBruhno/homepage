import { chunk } from 'lodash'
import { headers } from 'next/headers'
import { create, object, string, type as optionalObject, StructError, validate } from 'superstruct'

import { config } from 'config.server'

import { apiHandler, createRedis, gameFields, igdbFetcher, mapIgdbGame, prisma } from 'lib/api'
import { ApiError } from 'lib/errors'
import { authenticateSystem } from 'lib/middleware'

const deleteValidator = object({
	id: string(),
})

const updateValidator = optionalObject({
	id: string(),
})

export default apiHandler({ validMethods: ['POST'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		authenticateSystem(req)
		const redis = await createRedis()
		const requestedChanges = await redis.hGetAll('game')

		if (Object.entries(requestedChanges).length === 0) {
			await redis.disconnect()
			return res.status(200).json({
				message: 'No updates in the queue to process',
				updatedGames: [],
				deletedGames: [],
			})
		}

		const gamesToUpdate = Object.entries(requestedChanges)
			.filter(([, value]) => value === 'update' as const)
			.map(([key]) => key)

		const gamesToDelete = Object.entries(requestedChanges)
			.filter(([, value]) => value === 'delete' as const)
			.map(([key]) => key)

		await Promise.all([
			async () => {
				if (gamesToUpdate.length === 0) return
				const games = (await Promise.all(chunk(gamesToUpdate, 100).map(async (ids) => igdbFetcher('/games', res, {
					shouldReturnFirst: false,
					body: `${gameFields}; limit 100; where id = (${ids.join(',')});`,
					nickname: `outdated games, 0-100`,
				}).then((igdbGames) => igdbGames.map(mapIgdbGame))))).flat()

				const updateQueries = games.map(({ id, ...rest }) => prisma.games.update({
					where: { id },
					data: { ...rest, updatedAt: undefined },
				}))
				return prisma.$transaction(updateQueries)
			},
			async () => {
				if (gamesToDelete.length === 0) return
				const gamesChunks = chunk(gamesToDelete.map((id) => parseInt(id, 10)), 100).flat()
				const deleteQueries = gamesChunks.map((id) => prisma.games.delete({
					where: { id },
				}))
				return prisma.$transaction(deleteQueries)
			},
			async () => {
				await redis.hDel('game', [...gamesToDelete, ...gamesToUpdate])
				await redis.disconnect()
			},
		])

		return res.status(200).json({
			message: `Updated ${gamesToUpdate.length} game(s) and deleted ${gamesToDelete.length} game(s)`,
			updatedGames: gamesToUpdate,
			deletedGames: gamesToDelete,
		})
	})
	.post(async (req, res) => {
		if (req.headers['X-Secret'] !== config.igdb.webhookSecret) {
			throw ApiError.fromCodeWithCause(401, new Error(`Invalid secret`))
		}
		let updateRequest: { id: string } | null = null
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

		const existingGame = await prisma.games.findUnique({ where: { id: parseInt(updateRequest.id, 10) } })

		if (existingGame) {
			const redis = await createRedis()
			await redis.hSet('game', updateRequest.id, typeOfRequest)
			await redis.disconnect()

			return res.status(200).json({ message: `Added ${typeOfRequest} request for game with ID ${updateRequest.id}.` })
		}

		return res.status(200).json({ message: `Game with ID ${updateRequest.id} does not exist in catalogue, skipping change.` })
	})
