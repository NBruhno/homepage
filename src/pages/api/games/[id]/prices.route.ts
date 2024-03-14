import type { ItadLookup, ItadPrices } from 'types'

import { create, object, optional, string, union } from 'superstruct'

import { apiHandler, itadFetcher, setCache } from 'lib/api'

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

		if (!game) return res.status(200).json([])

		const prices = await itadFetcher<Array<ItadPrices>>('/games/prices', {
			method: 'POST',
			version: 2,
			body: JSON.stringify([game.id]),
			query: {
				country: 'DK',
			},
		}).then((response) => {
			if (response[0]) {
				return response[0].deals.map(({ shop, price, cut, url }) => ({
					currency: price.currency,
					amount: price.amount,
					difference: cut,
					id: shop.id,
					name: shop.name,
					url,
				}))
			}

			return []
		})

		setCache({ strategy: 'Default', duration: 5, res })
		res.status(200).json(prices)
	})
