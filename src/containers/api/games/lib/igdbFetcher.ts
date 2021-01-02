import type { Span } from '@sentry/types'
import type { NextApiResponse } from 'next'

import { config } from 'config.server'

import { delay } from 'lib/delay'
import { logger } from 'lib/logger'

import { ApiError } from '../../errors/ApiError'
import { monitorReturnAsync } from '../../performanceCheck'

export const retry = async (functionToRetry: () => Promise<Response>, retries: number, res: NextApiResponse): Promise<any> => {
	const result = await functionToRetry()

	if (result?.status >= 400) {
		if (result.status === 429) {
			await delay(1.2)
			return retry(functionToRetry, retries - 1, res)
		}

		logger.error(result)
		const error = ApiError.fromCode(500)
		res.status(error.statusCode).json({ error: error.message })
		throw error
	}

	return result.json()
}

type Options = {
	body?: string,
	nickname?: string,
	single?: boolean,
	span: Span,
}

export const igdbFetcher = async <T>(url: RequestInfo, res: NextApiResponse, { body, single, span, nickname }: Options): Promise<T> => {
	if (config.igdb.token === undefined || config.igdb.clientId === undefined) throw new Error('Both IGDB Token and Client ID needs to be set')

	const data = await monitorReturnAsync(() => retry(() => fetch(`https://api.igdb.com/v4${url}`, {
		method: 'POST',
		body,
		headers: new Headers({
			Authorization: `Bearer ${config.igdb.token!}`,
			'Client-ID': config.igdb.clientId!,
			'Content-Type': 'text/plain',
			accept: 'application/json',
		}),
	}), 3, res), `igdbFetcher()${nickname ? ` - ${nickname}` : ''}`, span)

	return single ? data[0] : data
}
