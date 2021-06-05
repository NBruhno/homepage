import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiOptions, ItadPlain, ItadPrices } from 'types'

import { createAndAttachError } from 'api/errors'
import { itadFetcher } from 'api/utils'

type Options = {
	gameId: number,
} & ApiOptions

export const prices = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method, query: { store, id, name } } = req
	const { transaction } = options

	switch (method) {
		case 'GET': {
			try {
				const plain = await itadFetcher<ItadPlain>('/game/plain', {
					version: 2,
					span: transaction,
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
					span: transaction,
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
