import { NextApiRequest, NextApiResponse } from 'next'

import type { Plain, Prices } from 'types/ITAD'
import type { Options as DefaultOptions } from '../types'

import { itadFetcher } from './lib'

import { sendError, throwError } from '../errors/ApiError'

type Options = {
	gameId: number,
} & DefaultOptions

export const prices = async (req: NextApiRequest, res: NextApiResponse, options: Options) => {
	const { method, query: { store, id, name } } = req
	const { transaction } = options
	transaction.setName(`${method} - api/games/{gameId}/prices`)

	switch (method) {
		case 'GET': {
			try {
				const plain = await itadFetcher<Plain>('/game/plain', {
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

				const prices = await itadFetcher<Prices>('/game/prices', {
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
				return throwError(error.statusCode, res)
			}
		}
		default: sendError(405, res)
	}
}
