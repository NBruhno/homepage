import type { GameWebsite, IgdbGame } from 'types'
import type { SteamOwnedGames } from 'types/steam'

import { fromUnixTime } from 'date-fns'
import { round } from 'lodash'
import { create, object, string, coerce, number } from 'superstruct'

import { config } from 'config.server'

import { apiHandler, gameFields, igdbFetcher, mapIgdbGame, prisma } from 'lib/api'
import type { statusCodes } from 'lib/errors'
import { ApiError } from 'lib/errors'
import { getSteamAppId } from 'lib/getSteamAppId'
import { authenticate } from 'lib/middleware'
import { monitorAsync } from 'lib/sentryMonitor'

const Query = object({
	id: coerce(number(), string(), (value) => parseInt(value, 10)),
})

export default apiHandler({
	validMethods: ['GET'],
	cacheStrategy: 'Default',
	cacheDuration: 60,
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/user-status`,
})
	.get(async (req, res) => {
		const { userId, steamId } = authenticate(req)
		const { id } = create(req.query, Query)

		const [userData, game] = await monitorAsync((span) => Promise.all([
			monitorAsync(() => prisma.gameUserData.findFirst({
				where: {
					gameId: id,
					ownerId: userId,
				},
				select: {
					isFollowing: true,
				},
			}), 'db:prisma', 'findFirst()', span),
			(async () => {
				let game = null
				game = await monitorAsync(() => prisma.game.findFirst({
					where: {
						id,
					},
					select: {
						websites: true,
					},
				}), 'db:prisma', 'findFirst()', span)

				if (!game) {
					game = await igdbFetcher('/games', res, {
						body: `${gameFields}; where id = ${id};`,
						shouldReturnFirst: true,
						nickname: 'find unknown game',
						span,
					}).then((game: IgdbGame | undefined) => {
						if (game) return { websites: mapIgdbGame(game).websites }
						return null
					})
				}

				return game
			})(),
		]), 'Promise.all()', '')

		const steamInfo = {
			isInSteamLibrary: false,
			timePlayed: null as number | null,
			timePlayedLastTwoWeeks: null as number | null,
			lastPlayedAt: null as string | null,
		}
		const isFollowing = Boolean(userData?.isFollowing)
		if (!userData && (!steamId || !game)) return res.status(200).json({ isFollowing, ...steamInfo })

		const steamAppId = getSteamAppId(game?.websites as Array<GameWebsite>)
		if (steamAppId && steamId) {
			await monitorAsync(() => fetch(
				`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001?steamid=${steamId}&key=${config.steam.apiKey}&format=json`,
				{
					method: 'GET',
				},
			), 'http:steam', 'game news').then(async (response) => {
				if (!response.ok) throw ApiError.fromCode(response.status as unknown as keyof typeof statusCodes)
				const payload = await response.json() as SteamOwnedGames
				const game = payload.response.games.find(({ appid }) => appid === parseInt(steamAppId, 10))
				steamInfo.isInSteamLibrary = Boolean(game)
				steamInfo.timePlayed = game ? round(game.playtime_forever / 60, 1) : null
				steamInfo.timePlayedLastTwoWeeks = game ? round((game.playtime_2weeks ?? 0) / 60, 1) : null
				steamInfo.lastPlayedAt = game?.rtime_last_played ? fromUnixTime(game.rtime_last_played).toISOString() : null
			})
		}

		return res.status(200).json({ isFollowing, ...steamInfo })
	})
