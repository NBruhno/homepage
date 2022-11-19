import { sub } from 'date-fns'
import { optional, string, object, create, pattern, coerce, number, array, partial, assign, pick, literal } from 'superstruct'

import { game as gameValidator } from 'validation/api'
import { uuid } from 'validation/shared'

import { gameFields, igdbFetcher, apiHandler, setCache, prisma, mapIgdbGame } from 'lib/api'
import { authenticateSystem } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	user: optional(uuid()),
	search: optional(string()),
	take: optional(coerce(number(), pattern(string(), /[1-50]/), (value) => parseInt(value, 10))),
	skip: optional(coerce(number(), pattern(string(), /[0-9]+/), (value) => parseInt(value, 10))),
	'is-popular': optional(literal('yes')),
})

const getHasAfter = (returnCount: number, takeCount: number, hasSkip: boolean) => {
	if (hasSkip) {
		if (returnCount === takeCount + 2) return true
		return false
	}
	if (returnCount === takeCount + 1) return true
	return false
}

export default apiHandler({ validMethods: ['GET', 'POST', 'PUT', 'PATCH'] })
	.get(async (req, res) => {
		const { search, take = 50, skip = 0, user, 'is-popular': isPopular } = create(req.query, Query)
		const hasSkip = skip > 0
		const computedTake = hasSkip ? take + 2 : take + 1
		const computedSkip = hasSkip ? skip - 1 : skip

		if (user) {
			const games = await monitorAsync(() => prisma.game.findMany({
				where: {
					userData: {
						some: { ownerId: user, isFollowing: true },
					},
				},
				orderBy: {
					releaseDate: { sort: 'asc', nulls: 'last' },
				},
				take: computedTake,
				skip: computedSkip,
				select: {
					id: true,
					name: true,
					cover: true,
					releaseDate: true,
					status: true,
				},
			}), 'db:prisma', 'findMany(user)')

			setCache({ strategy: 'NoCache', res })
			return res.status(200).json({
				games: hasSkip ? games.slice(1, take + 1) : games,
				take,
				skip,
				before: hasSkip ? games[0] : null,
				after: getHasAfter(games.length, take, hasSkip) ? games.pop() : null,
			})
		}

		const twoMonthsBackDate = sub(Date.now(), { months: 2 })

		const games = search
			? await igdbFetcher('/games', res, {
				shouldReturnFirst: false,
				body: `${gameFields}; limit ${take}; search "${search}";`,
				nickname: 'search',
			}).then((games) => games.map(mapIgdbGame))
			: await monitorAsync(() => prisma.game.findMany({
				orderBy: [{ hype: 'desc' }, { releaseDate: 'asc' }],
				where: {
					OR: [
						{
							releaseDate: {
								gte: twoMonthsBackDate,
							},
						},
						{
							releaseDate: null,
						},
					],
					hype: isPopular === 'yes' ? {
						gt: 0,
					} : undefined,
				},
				take: computedTake,
				skip: computedSkip,
				select: {
					id: true,
					name: true,
					cover: true,
					releaseDate: true,
					status: true,
				},
			}), 'db:prisma', 'findMany()')

		setCache({ strategy: 'StaleWhileRevalidate', duration: 30, res })

		return res.status(200).json({
			games: hasSkip ? games.slice(1, take + 1) : games,
			skip,
			take,
			before: hasSkip ? games[0] : null,
			after: getHasAfter(games.length, take, hasSkip) ? games.pop() : null,
		})
	})
	.post(async (req, res) => {
		authenticateSystem(req)
		const gameToCreate = create(req.body, gameValidator)

		const game = await monitorAsync(() => prisma.game.create({
			data: { ...gameToCreate, updatedAt: undefined },
		}), 'db:prisma', 'create()')

		res.setHeader('Location', `/api/games/${game.id}`)
		return res.status(201).json(game)
	})
	.put(async (req, res) => {
		authenticateSystem(req)
		const { games } = create(req.body, object({ games: array(assign(partial(gameValidator), pick(gameValidator, ['id']))) }))
		const updateQueries = games.map(({ id, ...rest }) => prisma.game.update({
			where: { id },
			data: { ...rest, updatedAt: undefined },
		}))

		const updatedGames = await monitorAsync(() => prisma.$transaction(updateQueries), 'db:prisma', 'transaction(update())')
		return res.status(200).json({ count: updatedGames.length })
	})
	.patch(async (req, res) => {
		authenticateSystem(req)
		const { games } = create(req.body, object({ games: array(gameValidator) }))
		const transactions = games.map(({ id, ...rest }) => prisma.game.upsert({
			where: { id },
			create: { id, ...rest, updatedAt: undefined },
			update: { id, ...rest, updatedAt: undefined },
		}))

		const result = await monitorAsync(() => prisma.$transaction(transactions), 'db:prisma', 'transaction(upsert())')

		return res.status(200).json(result)
	})
