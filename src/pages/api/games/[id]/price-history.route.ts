import type { ItadHistoricLow, ItadLookup, ItadStoreHistoricLows, ItadShops } from 'types'

import { sortBy } from 'lodash'
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
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/price-history`,
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

		const [historicLow, storeHistoricLows, stores] = await Promise.all([
			itadFetcher<Array<ItadHistoricLow>>('/games/historylow', {
				method: 'POST',
				version: 1,
				body: JSON.stringify([game.id]),
				query: {
					country: 'DK',
				},
			}).then((response) => {
				if (response[0]) {
					const { price, cut, shop } = response[0].low
					return {
						currency: price.currency,
						amount: price.amount,
						difference: cut,
						id: shop.id,
						name: shop.name,
					}
				}
				return null
			}),
			itadFetcher<Array<ItadStoreHistoricLows>>('/games/storelow', {
				method: 'POST',
				version: 2,
				body: JSON.stringify([game.id]),
				query: {
					country: 'DK',
				},
			}).then((response) => {
				if (response[0]) {
					return sortBy(response[0].lows.map(({ shop, price }) => ({
						currency: price.currency,
						shop,
						amount: price.amount,
					})), 'amount')
				}
				return []
			}),
			itadFetcher<Array<ItadShops>>('/service/shops', {
				version: 1,
				query: {
					country: 'DK',
				},
			}).then((response) => response.map((shop) => shop)),
		])

		setCache({ strategy: 'Default', duration: 5, res })
		res.status(200).json({ historicLow, storeHistoricLows: storeHistoricLows.map(({ shop, ...rest }) => ({ ...rest, id: shop, name: stores.find(({ id }) => id === shop.id)?.title ?? shop })) })
	})
