import type { GamePrice, ItadLookup, ItadPrices } from 'types'

import { sort } from 'radash'
import { create, object, optional, string, union } from 'superstruct'

import { apiHandler, instantGamingFetcher, itadFetcher, setCache } from 'lib/api'
import { ApiError } from 'lib/errors'
import { monitorAsync } from 'lib/sentryMonitor'
import { uniqBy } from 'lodash'
import type { SteamPriceOverview } from 'types/steam'

const Query = union([
	object({
		'steam-app-id': string(),
		store: optional(string()),
		id: optional(string()),
		name: string(),
	}),
	object({
		'steam-app-id': string(),
		store: optional(string()),
		id: string(),
		name: optional(string()),
	}),
	object({
		'steam-app-id': string(),
		store: string(),
		id: optional(string()),
		name: optional(string()),
	}),
])

export default apiHandler({
	validMethods: ['GET'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/prices`,
	cacheStrategy: 'Default',
	cacheDuration: 60,
}).get(async (req, res) => {
	const { id, name, 'steam-app-id': steamId } = create(req.query, Query)

	let prices: Array<GamePrice> = []
	const [game, instantGamingPrices, steamPrice]: [ItadLookup['game'] | null, Array<GamePrice>, GamePrice | null] = await Promise.all([
		itadFetcher<ItadLookup>('/games/lookup', {
			version: 1,
			query: {
				appid: id,
				title: name,
			},
		}).then((response) => {
			if (response.found) return response.game ?? null
			return null
		}),
		(async () => {
			if (name) {
				return (await instantGamingFetcher(name)).hits
					.filter((game) => name.includes(game.name) && game.discount !== 0 && game.discount !== 100)
					.map((game) => ({
						currency: game.retail_currency,
						amount: game.price,
						retailAmount: parseFloat(game.retail),
						difference: game.discount,
						id: 'instant-gaming',
						name: 'Instant Gaming',
						gameName: game.name,
						hasStock: game.has_stock === 1 ? 'yes' : 'no',
						platform: game.platform,
						url: `https://www.instant-gaming.com/en/${game.prod_id}-buy-${game.platform}-${game.seo_name}?igr=gamer-7170045`.toLowerCase(),
					}))
			}
			return []
		})(),
		(async () => {
			if (!id) return null
			return await monitorAsync(
				() =>
					fetch(`https://store.steampowered.com/api/appdetails?appids=${steamId}&cc=dk&filters=price_overview`, {
						method: 'GET',
					}),
				'http:steam',
				'total game reviews',
			).then(async (response) => {
				if (!response.ok) throw ApiError.fromCode(500)
				const priceOverview = (await response.json()) as SteamPriceOverview
				if (!priceOverview[steamId].success || Array.isArray(priceOverview[steamId].data)) return null

				return {
					currency: priceOverview[steamId].data.price_overview.currency,
					amount: priceOverview[steamId].data.price_overview.final / 100,
					retailAmount: priceOverview[steamId].data.price_overview.initial / 100,
					difference: priceOverview[steamId].data.price_overview.discount_percent,
					id: 'steam',
					name: 'Steam',
					gameName: name!,
					hasStock: 'unknown' as const,
					platform: null,
					url: `https://store.steampowered.com/app/${steamId}`,
				}
			})
		})(),
	])

	if (instantGamingPrices.length > 0) prices = instantGamingPrices
	if (steamPrice) prices = [...prices, steamPrice]

	if (game) {
		const itadPrices = await itadFetcher<Array<ItadPrices>>('/games/prices', {
			method: 'POST',
			version: 2,
			body: JSON.stringify([game.id]),
			query: {
				country: 'DK',
			},
		}).then((response) => {
			if (response[0]) {
				return response[0].deals.map(({ shop, price, regular, cut, url }) => ({
					currency: price.currency,
					amount: price.amount,
					retailAmount: regular.amount,
					difference: cut,
					id: shop.id,
					name: shop.name,
					gameName: name!,
					hasStock: 'unknown' as const,
					platform: null,
					url,
				}))
			}

			return []
		})
		prices = [...prices, ...itadPrices]
	}

	setCache({ strategy: 'Default', duration: 5, res })
	res.status(200).json(
		sort(
			uniqBy(prices.flat(), ({ name }) => name),
			(price) => price.amount,
		),
	)
})
