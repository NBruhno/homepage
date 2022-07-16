import { withSentry } from '@sentry/nextjs'
import { compareAsc, getUnixTime, sub } from 'date-fns'
import chunk from 'lodash/chunk'
import differenceBy from 'lodash/differenceBy'
import differenceWith from 'lodash/differenceWith'
import intersectionBy from 'lodash/intersectionBy'
import { array, create, object, optional, coerce, number, pattern, string } from 'superstruct'

import { config } from 'config.server'

import { game as gameValidator } from 'validation/api'

import { absoluteUrl, apiHandler, gameFields, igdbFetcher, mapIgdbGame, prisma } from 'lib/api'
import { fetcher, Method } from 'lib/fetcher'
import { filterUnspecified } from 'lib/filterUnspecified'
import { authenticateSystem } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	take: optional(coerce(number(), pattern(string(), /[1-500]/), (value) => parseInt(value, 10))),
})

const handler = apiHandler({ validMethods: ['GET', 'POST', 'PATCH'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		authenticateSystem(req)
		const { take = 10000 } = create(req.query, Query)

		// Get all games that has not been checked after 24 hours
		const staleGames = await monitorAsync(() => prisma.game.findMany({
			where: {
				lastChecked: {
					lte: sub(Date.now(), { hours: 24 }),
				},
			},
			take,
			select: {
				id: true,
				lastChecked: true,
			},
		}), 'db:prisma', 'findMany(unchecked games)')

		return res.status(200).json({
			message: staleGames.length > 0 ? `Some games are not being updated properly` : `There are no stale games in the library`,
			numberOfStaleGames: staleGames.length,
			staleGames,
		})
	})
	.post(async (req, res) => {
		authenticateSystem(req)
		const { take = 500 } = create(req.query, Query)
		const twoMonthsBackTimestamp = getUnixTime(sub(Date.now(), { months: 2 }))
		const popularGames = await igdbFetcher('/games', res, {
			shouldReturnFirst: false,
			body: `${gameFields}; limit ${take}; where (first_release_date >= ${twoMonthsBackTimestamp} & hypes >= 3) | (first_release_date >= ${twoMonthsBackTimestamp} & follows >= 3); sort id asc;`,
			nickname: `popular, 0-${take}`,
		}).then((igdbGames) => igdbGames.map(mapIgdbGame))

		const existingGames = await monitorAsync(() => prisma.game.findMany({
			where: {
				OR: popularGames.map(({ id }) => ({
					id,
				})),
			},
			select: {
				id: true,
				updatedAt: true,
			},
		}), 'db:prisma', 'findMany(popular games)')

		const games = create(popularGames, array(gameValidator))

		const knownGames = intersectionBy(games, existingGames, 'id') // Finds games that we already know
		const outdatedGames = differenceWith( // Finds the games that are newer than the games we already know
			knownGames,
			existingGames,
			(known, existing) => (known.updatedAt && existing.updatedAt)
				? compareAsc(new Date(known.updatedAt), existing.updatedAt) === -1
				: false,
		)
		const newGames = differenceBy(games, existingGames, 'id') // Only interested in creating new unique games.

		const [createdGamesResponse, ...updatedGamesResponse] = await monitorAsync((span) => Promise.all([
			(async () => newGames.length > 0
				? monitorAsync(() => prisma.game.createMany({ data: newGames, skipDuplicates: true }), 'db:prisma', 'createMany(new games)', span)
				: undefined
			)(),
			...outdatedGames.length > 0 ? chunk(outdatedGames, 50).map((batch) => monitorAsync(() => fetcher<{ count: number }>(`/games`, {
				body: { games: batch },
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				method: Method.Put,
			}), 'http:internal', 'PUT /games', span)) : [undefined],
		]), 'Promise', '.all()')

		return res.status(200).json({
			status: {
				popularGames: games.length,
				knownGames: knownGames.length,
				newGames: newGames.length,
				outdatedGames: outdatedGames.length,
			},
			resolution: {
				createdGames: createdGamesResponse?.count ?? 0,
				updatedGames: filterUnspecified(updatedGamesResponse.map((response) => response?.count)).reduce((a, b) => a + b, 0),
			},
		})
	})
	.patch(async (req, res) => {
		authenticateSystem(req)
		const { take = 100 } = create(req.query, Query)

		// Get all games in the library that hasn't been updated in the last 24 hours
		const potentiallyOutdatedGames = await monitorAsync(() => prisma.game.findMany({
			where: {
				lastChecked: {
					lte: sub(Date.now(), { hours: 1 }),
				},
			},
			take,
			select: {
				id: true,
				updatedAt: true,
			},
		}), 'db:prisma', 'findMany(potentially outdated games)')

		if (potentiallyOutdatedGames.length > 0) {
			const updatedGames = await igdbFetcher('/games', res, {
				shouldReturnFirst: false,
				body: `${gameFields}; limit ${take}; where id = (${potentiallyOutdatedGames.map(({ id }) => id).join(',')});`,
				nickname: `potentially outdated, 0-${take}`,
			}).then((igdbGames) => igdbGames.map(mapIgdbGame))

			// Finds the games that have been updated since we last updated them
			const gamesToUpdate = differenceWith(
				updatedGames,
				potentiallyOutdatedGames,
				(known, existing) => (known.updatedAt && existing.updatedAt)
					? compareAsc(new Date(known.updatedAt), existing.updatedAt) === -1
					: false,
			)

			const existingGames = differenceBy(potentiallyOutdatedGames, gamesToUpdate, 'id')

			if (gamesToUpdate.length > 0) {
				const [markedAsCheckedGames, ...updatedGamesResponse] = await monitorAsync((span) => Promise.all([
					monitorAsync(() => prisma.game.updateMany({
						where: {
							OR: existingGames.map(({ id }) => ({ id })),
						},
						data: {
							lastChecked: new Date().toISOString(),
						},
					}), 'db:prisma', 'updateMany()', span),
					...chunk(gamesToUpdate, 50).map((batch) => monitorAsync(() => fetcher<{ count: number }>(`/games`, {
						body: { games: batch.map((game) => ({ ...game, lastChecked: new Date().toISOString() })) },
						absoluteUrl: absoluteUrl(req).origin,
						accessToken: config.auth.systemToken,
						method: Method.Put,
					}), 'http:internal', 'PUT /games', span)),
				]), 'Promise', '.all()')

				const updatedGamesCount = updatedGamesResponse.map((response) => response.count).reduce((a, b) => a + b, 0)

				return res.status(201).json({
					status: {
						potentiallyOutdatedGames: potentiallyOutdatedGames.length,
						foundGames: updatedGames.length,
						outdatedGames: gamesToUpdate.length,
					},
					resolution: {
						markedAsCheckedGames: markedAsCheckedGames.count,
						updatedGames: filterUnspecified(updatedGamesResponse.map((response) => response.count)).reduce((a, b) => a + b, 0),
					},
					message: `Successfully updated ${updatedGamesCount} games`,
				})
			}

			const markedAsCheckedGames = await monitorAsync(() => prisma.game.updateMany({
				where: {
					OR: existingGames.map(({ id }) => ({ id })),
				},
				data: {
					lastChecked: new Date().toISOString(),
				},
			}), 'db:prisma', 'updateMany()')

			return res.status(200).json({
				status: {
					potentiallyOutdatedGames: potentiallyOutdatedGames.length,
					foundGames: updatedGames.length,
					outdatedGames: gamesToUpdate.length,
				},
				resolution: {
					markedAsCheckedGames: markedAsCheckedGames.count,
				},
				message: `Found no games to update`,
			})
		}

		return res.status(200).json({ message: 'There were no games to update' })
	})

export default withSentry(handler)
