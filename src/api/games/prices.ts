import type { NextApiRequest, NextApiResponse } from 'next'
import type { ItadPlain, ItadPrices } from 'types'

import { createAndAttachError } from 'api/errors'
import { itadFetcher } from 'api/utils'

export const prices = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query: { store, id, name } } = req

	switch (method) {
		case 'GET': {
			try {
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

				res.setHeader('Cache-Control', 's-maxage=60')
				return res.status(200).json({ prices })
			} catch (error) {
				throw createAndAttachError(error.statusCode, res, error)
			}
		}
		default: throw createAndAttachError(405, res)
	}
}
