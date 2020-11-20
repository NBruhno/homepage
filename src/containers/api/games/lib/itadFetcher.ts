import type { Span } from '@sentry/types'

import { config } from 'config.server'

import { monitorReturnAsync } from '../../performanceCheck'

type Options = {
	body?: string,
	nickname?: string,
	span: Span,
	query?: Record<string, any>,
	version: number,
}

export const itadFetcher = async <T>(url: RequestInfo, { body, span, nickname, query, version }: Options): Promise<T> => {
	if (config.itad.apiKey === undefined) throw new Error('ITAD API key needs to be set')

	const params = new URLSearchParams({
		key: config.itad.apiKey,
		...query,
	})

	const data = await monitorReturnAsync(() => fetch(`https://api.isthereanydeal.com/v0${version}${url}?${params}`, {
		method: 'GET',
		body,
		headers: new Headers({
			'Content-Type': 'text/plain',
			accept: 'application/json',
		}),
	}), `igdbFetcher() ${url}${nickname && ` - ${nickname}`}`, span)

	return data.json()
}
