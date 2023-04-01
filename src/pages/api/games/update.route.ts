import { compareAsc, getUnixTime, isAfter, sub } from 'date-fns'
import { chunk, differenceBy, differenceWith, intersectionBy, partition } from 'lodash'
import { array, create, object, optional, coerce, number, pattern, string, assign, enums, literal } from 'superstruct'

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

export default apiHandler({ validMethods: ['GET', 'POST', 'PATCH'], cacheStrategy: 'NoCache' })
	.get(async (req, res) => {
		const UpdateQuery = object({
			'hours-since-last-checked': optional(coerce(number(), pattern(string(), /[1-100]/), (value) => parseInt(value, 10))),
			'hours-since-last-checked-priority': optional(coerce(number(), pattern(string(), /[1-100]/), (value) => parseInt(value, 10))),
			take: optional(coerce(number(), pattern(string(), /[1-100000]/), (value) => parseInt(value, 10))),
		})
		authenticateSystem(req)
		const { take = 10000, 'hours-since-last-checked': hoursSinceLastChecked = 72, 'hours-since-last-checked-priority': hoursSinceLastCheckedPriority = 24 } = create(req.query, UpdateQuery)

		const twoMonthsBackDate = sub(Date.now(), { months: 2 })
		// Get all games that has not been checked after 24 hours
		const staleGames = await monitorAsync(() => prisma.game.findMany({
			where: {
				OR: [
					{
						lastCheckedAt: { lte: sub(Date.now(), { hours: hoursSinceLastChecked }) },
						userData: { some: { isFollowing: false } },
					},
					{
						lastCheckedAt: { lte: sub(Date.now(), { hours: hoursSinceLastCheckedPriority }) },
						userData: { some: { isFollowing: true } },
					},
					{
						lastCheckedAt: { lte: sub(Date.now(), { hours: hoursSinceLastCheckedPriority }) },
						OR: [
							{ releaseDate: { gte: twoMonthsBackDate } },
							{ releaseDate: null },
						],
						hype: { gt: 0 },
					},
				],
			},
			take,
			select: {
				id: true,
				lastCheckedAt: true,
				hype: true,
				releaseDate: true,
				userData: {
					select: {
						isFollowing: true,
					},
				},
			},
		}), 'db:prisma', 'findMany(stale games)')

		const [stalePriorityGames, staleRegularGames] = partition(staleGames, (game) => (
			((game.releaseDate === null || isAfter(game.releaseDate, twoMonthsBackDate))
			&& (game.hype !== null && game.hype >= 0))
			|| game.userData.some(({ isFollowing }) => isFollowing)
		))

		return res.status(200).json({
			message: staleGames.length > 0 ? `Some games are not being updated properly` : `There are no stale games in the library`,
			numberOfStaleRegularGames: staleRegularGames.length,
			numberOfStalePriorityGames: stalePriorityGames.length,
			stalePriorityGames,
			staleRegularGames,
		})
	})
	.post(async (req, res) => {
		const UpdateQuery = assign(Query, object({
			type: enums(['popular', 'followed']),
			'hours-since-last-checked': optional(coerce(number(), pattern(string(), /[1-100]/), (value) => parseInt(value, 10))),
		}))
		authenticateSystem(req)
		const { take = 500, type, 'hours-since-last-checked': hoursSinceLastChecked = 1 } = create(req.query, UpdateQuery)

		switch (type) {
			case 'popular': {
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
					(known, existing) => known.updatedAt
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
			}
			case 'followed': {
				// Get all followed games in the library that hasn't been updated in the last 1 hour
				const potentiallyOutdatedFollowedGames = await monitorAsync(() => prisma.gameUserData.findMany({
					where: {
						game: {
							lastCheckedAt: {
								lte: sub(Date.now(), { hours: hoursSinceLastChecked }),
							},
						},
						isFollowing: true,
					},
					take,
					select: {
						game: {
							select: {
								id: true,
								updatedAt: true,
							},
						},
					},
				}), 'db:prisma', 'findMany(potentially outdated followed games)')
					.then((potentiallyOutdatedFollowedGames) => potentiallyOutdatedFollowedGames.map(({ game }) => game))

				if (potentiallyOutdatedFollowedGames.length > 0) {
					const updatedGames = await igdbFetcher('/games', res, {
						shouldReturnFirst: false,
						body: `${gameFields}; limit ${take}; where id = (${potentiallyOutdatedFollowedGames.map(({ id }) => id).join(',')});`,
						nickname: `potentially outdated, 0-${take}`,
					}).then((igdbGames) => igdbGames.map(mapIgdbGame))

					// Finds the games that have been updated since we last updated them
					const gamesToUpdate = differenceWith(
						updatedGames,
						potentiallyOutdatedFollowedGames,
						(known, existing) => known.updatedAt
							? compareAsc(new Date(known.updatedAt), existing.updatedAt) === -1
							: false,
					)

					const existingGames = differenceBy(potentiallyOutdatedFollowedGames, gamesToUpdate, 'id')

					if (gamesToUpdate.length > 0) {
						const [markedAsCheckedGames, ...updatedGamesResponse] = await monitorAsync((span) => Promise.all([
							monitorAsync(() => prisma.game.updateMany({
								where: {
									OR: existingGames.map(({ id }) => ({ id })),
								},
								data: {
									lastCheckedAt: new Date().toISOString(),
								},
							}), 'db:prisma', 'updateMany()', span),
							...chunk(gamesToUpdate, 50).map((batch) => monitorAsync(() => fetcher<{ count: number }>(`/games`, {
								body: { games: batch.map((game) => ({ ...game, lastCheckedAt: new Date().toISOString() })) },
								absoluteUrl: absoluteUrl(req).origin,
								accessToken: config.auth.systemToken,
								method: Method.Put,
							}), 'http:internal', 'PUT /games', span)),
						]), 'Promise', '.all()')

						const updatedGamesCount = updatedGamesResponse.map((response) => response.count).reduce((a, b) => a + b, 0)

						return res.status(201).json({
							status: {
								potentiallyOutdatedFollowedGames: potentiallyOutdatedFollowedGames.length,
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
							lastCheckedAt: new Date().toISOString(),
						},
					}), 'db:prisma', 'updateMany()')

					return res.status(200).json({
						status: {
							potentiallyOutdatedFollowedGames: potentiallyOutdatedFollowedGames.length,
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
			}
		}
	})
	.patch(async (req, res) => {
		authenticateSystem(req)
		const UpdateQuery = assign(Query, object({
			'exclude-followed': optional(literal('yes')),
			'hours-since-last-checked': optional(coerce(number(), pattern(string(), /[1-100]/), (value) => parseInt(value, 10))),
		}))
		const { take = 100, 'exclude-followed': excludeFollowed, 'hours-since-last-checked': hoursSinceLastChecked = 2 } = create(req.query, UpdateQuery)

		// Get all games in the library that hasn't been checked for updates
		const potentiallyOutdatedGames = await monitorAsync(() => prisma.game.findMany({
			orderBy: [{
				lastCheckedAt: 'asc',
			}],
			where: {
				lastCheckedAt: {
					lte: sub(Date.now(), { hours: hoursSinceLastChecked }),
				},
				NOT: excludeFollowed === 'yes' ? [
					{
						userData: {
							some: {
								isFollowing: true,
							},
						},
					},
				] : undefined,
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

			// Finds the games that already have been updated since we last updated them
			const gamesToUpdate = differenceWith(
				updatedGames,
				potentiallyOutdatedGames,
				(known, existing) => known.updatedAt
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
							lastCheckedAt: new Date().toISOString(),
						},
					}), 'db:prisma', 'updateMany()', span),
					...chunk(gamesToUpdate, 50).map((batch) => monitorAsync(() => fetcher<{ count: number }>(`/games`, {
						body: { games: batch.map((game) => ({ ...game, lastCheckedAt: new Date().toISOString() })) },
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
					lastCheckedAt: new Date().toISOString(),
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
