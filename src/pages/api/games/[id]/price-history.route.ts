import type { ItadHistoricLow, ItadPlain, ItadStoreHistoricLows, ItadStores } from 'types'

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
		const { store, id, name } = create(req.query, Query)
		const plain = await itadFetcher<ItadPlain>('/game/plain', {
			version: 2,
			query: {
				gameId: id,
				shop: store,
				title: name,
			},
		}).then((response) => {
			if (response['.meta'].match) return response.data.plain
			return null
		})

		if (!plain) return res.status(200).json([])

		const [historicLow, storeHistoricLows, stores] = await Promise.all([
			itadFetcher<ItadHistoricLow>('/game/lowest', {
				version: 1,
				query: {
					country: 'DK',
					plains: plain,
				},
			}).then((response) => {
				const { price, cut, shop, urls } = response.data[plain]
				return {
					currency: response['.meta'].currency,
					amount: price,
					difference: cut,
					id: shop.id,
					name: shop.name,
					urls,
				}
			}),
			itadFetcher<ItadStoreHistoricLows>('/game/storelow', {
				version: 1,
				query: {
					country: 'DK',
					plains: plain,
				},
			}).then((response) => sortBy(response.data[plain].map(({ shop, price: amount }) => ({
				currency: response['.meta'].currency,
				shop,
				amount,
			})), 'amount')),
			itadFetcher<ItadStores>('/web/stores', {
				version: 2,
				query: {
					region: 'eu1',
					country: 'DK',
				},
			}).then((response) => response.data.map((shop) => shop)),
		])

		setCache({ strategy: 'Default', duration: 5, res })
		res.status(200).json({ historicLow, storeHistoricLows: storeHistoricLows.map(({ shop, ...rest }) => ({ ...rest, id: shop, name: stores.find(({ id }) => id === shop)?.title ?? shop })) })
	})
