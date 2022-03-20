import type { Span } from '@sentry/types'

import { config } from 'config.server'

import { monitorAsync } from 'lib/sentryMonitor'

type Options = {
	body?: string | null,
	nickname?: string,
	span?: Span,
	query?: Record<string, any>,
	version: number,
}

export const itadFetcher = async <T>(url: string, { body = null, span, nickname, query, version }: Options): Promise<T> => {
	// We assume that the env variables are always available, but this is just an extra precaution
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (config.itad.apiKey === undefined) throw new Error('ITAD API key needs to be set')

	const params = new URLSearchParams({
		key: config.itad.apiKey,
		...query,
	})

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	const data = await monitorAsync(() => fetch(`https://api.isthereanydeal.com/v0${version}${url}?${params}`, {
		method: 'GET',
		body,
		headers: new Headers({
			'Content-Type': 'text/plain',
			accept: 'application/json',
		}),
	}), 'http:itad', `${nickname ? ` - ${nickname}` : ''}`, span)

	return data.json() as unknown as T
}
