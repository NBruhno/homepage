import { withSentry } from '@sentry/nextjs'
import { compareAsc, getUnixTime, sub } from 'date-fns'
import { chunk, intersectionBy, differenceBy, differenceWith } from 'lodash'
import { array, create } from 'superstruct'

import { config } from 'config.server'

import { absoluteUrl } from 'lib/absoluteUrl'
import { fetcher, Method } from 'lib/fetcher'
import { filterUnspecified } from 'lib/filterUnspecified'

import { authenticateSystem } from 'api/middleware'
import { apiHandler, gameFields, igdbFetcher, mapIgdbGame } from 'api/utils'
import { game as gameValidator } from 'api/validation'

const handler = apiHandler({ validMethods: ['POST', 'PATCH'], cacheStrategy: 'NoCache' })
	.post(async (req, res) => {
		authenticateSystem(req)
		const twoMonthsBackTimestamp = getUnixTime(sub(Date.now(), { months: 2 }))
		const popularGames = await igdbFetcher('/games', res, {
			shouldReturnFirst: false,
			body: `${gameFields}; limit 500; where (first_release_date >= ${twoMonthsBackTimestamp} & hypes >= 3) | (first_release_date >= ${twoMonthsBackTimestamp} & follows >= 3); sort id asc;`,
			nickname: 'popular, 0-500',
		}).then((igdbGames) => igdbGames.map(mapIgdbGame))

		const existingGames = await prisma.game.findMany({
			where: {
				OR: popularGames.map(({ id }) => ({
					id,
				})),
			},
			select: {
				id: true,
				updatedAt: true,
			},
		})

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

		const [createdGamesResponse, ...updatedGamesResponse] = await Promise.all([
			newGames.length > 0 ? prisma.game.createMany({ data: newGames, skipDuplicates: true }) : undefined,
			...outdatedGames.length > 0 ? chunk(outdatedGames, 50).map((batch) => fetcher<{ count: number }>(`/games`, {
				body: { games: batch },
				absoluteUrl: absoluteUrl(req).origin,
				accessToken: config.auth.systemToken,
				method: Method.Put,
			})) : [undefined],
		])

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

		// Get all games in the library that hasn't been updated in the last 24 hours
		const potentiallyOutdatedGames = await prisma.game.findMany({
			where: {
				lastChecked: {
					lte: sub(Date.now(), { hours: 1 }),
				},
			},
			take: 100,
			select: {
				id: true,
				updatedAt: true,
			},
		})

		if (potentiallyOutdatedGames.length > 0) {
			const updatedGames = await igdbFetcher('/games', res, {
				shouldReturnFirst: false,
				body: `${gameFields}; limit 100; where id = (${potentiallyOutdatedGames.map(({ id }) => id).join(',')});`,
				nickname: 'popular, 0-500',
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
				const [markedAsCheckedGames, ...updatedGamesResponse] = await Promise.all([
					prisma.game.updateMany({
						where: {
							OR: existingGames.map(({ id }) => ({ id })),
						},
						data: {
							lastChecked: new Date().toISOString(),
						},
					}),
					...chunk(gamesToUpdate, 50).map((batch) => fetcher<{ count: number }>(`/games`, {
						body: { games: batch.map((game) => ({ ...game, lastChecked: new Date().toISOString() })) },
						absoluteUrl: absoluteUrl(req).origin,
						accessToken: config.auth.systemToken,
						method: Method.Put,
					})),
				])

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

			const markedAsCheckedGames = await prisma.game.updateMany({
				where: {
					OR: existingGames.map(({ id }) => ({ id })),
				},
				data: {
					lastChecked: new Date().toISOString(),
				},
			})

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
