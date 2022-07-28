import type { ItadPlain, ItadPrices } from 'types'

import { withSentry } from '@sentry/nextjs'
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

const handler = apiHandler({
	validMethods: ['GET'],
	transactionName: (req) => `${req.method ?? 'UNKNOWN'} api/games/{gameId}/prices`,
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

		if (!plain) return res.status(200).json({ prices: [] })

		const prices = await itadFetcher<ItadPrices>('/game/prices', {
			version: 1,
			query: {
				country: 'DK',
				plains: plain,
			},
		}).then((response) => response.data[plain].list.map(({ shop, price_new: current, price_cut: difference, url }) => ({
			currency: response['.meta'].currency,
			current,
			difference,
			id: shop.id,
			name: shop.name,
			url,
		})))

		setCache({ strategy: 'Default', duration: 5, res })
		res.status(200).json({ prices })
	})

export default withSentry(handler)
