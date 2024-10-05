import type { ItadLookup, ItadPrices } from 'types'

import { sort } from 'radash'
import { create, object, optional, string, union } from 'superstruct'

import { apiHandler, instantGamingFetcher, itadFetcher, setCache } from 'lib/api'

const Query = union([
	object({
		store: optional(string()),
		id: optional(string()),
		name: string(),
	}),
	object({
		store: optional(string()),
		id: string(),
		name: optional(string()),
	}),
	object({
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
})
	.get(async (req, res) => {
		const { id, name } = create(req.query, Query)
		const game = await itadFetcher<ItadLookup>('/games/lookup', {
			version: 1,
			query: {
				appid: id,
				title: name,
			},
		}).then((response) => {
			if (response.found) return response.game!
			return null
		})

		const prices = await Promise.all([
			(async () => {
				if (!game) return []

				return (await itadFetcher<Array<ItadPrices>>('/games/prices', {
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
							gameGame: name,
							hasStock: 'unknown',
							platform: null,
							url,
						}))
					}

					return []
				}))
			})(),
			(async () => {
				if (name) {
					return (await instantGamingFetcher(name)).hits.filter((game) => name.includes(game.name) && game.discount !== 0 && game.discount !== 100).map((game) => ({
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
		])

		setCache({ strategy: 'Default', duration: 5, res })
		res.status(200).json(sort(prices.flat(), (price) => price.amount))
	})
