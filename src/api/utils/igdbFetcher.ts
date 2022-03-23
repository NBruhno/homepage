import type { Span } from '@sentry/types'
import type { NextApiResponse } from 'next'
import type { IgdbGame } from 'types'

import { config } from 'config.server'

import { delay } from 'lib/delay'
import { logger } from 'lib/logger'
import { monitorAsync } from 'lib/sentryMonitor'

import { ApiError } from 'api/errors'

export const retry = async (functionToRetry: () => Promise<Response>, retries: number, res: NextApiResponse): Promise<Array<IgdbGame>> => {
	const result = await functionToRetry()

	if (result.status >= 400) {
		if (result.status === 429) {
			await delay(1.2)
			return retry(functionToRetry, retries - 1, res)
		}

		logger.error(result)
		const error = ApiError.fromCode(500)
		res.status(error.statusCode).json({ error: error.message })
		throw error
	}

	return result.json() as unknown as Array<IgdbGame>
}

type Options<T> = {
	body?: string | null,
	nickname?: string,
	shouldReturnFirst: T,
	span?: Span | undefined,
}

type ReturnType<T> = T extends true ? IgdbGame : Array<IgdbGame>

export const igdbFetcher = async <T extends boolean>(url: string, res: NextApiResponse, {
	body = null,
	shouldReturnFirst,
	span,
	nickname,
}: Options<T>): Promise<ReturnType<T>> => {
	// We assume that the env variables are always available, but this is just an extra precaution
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (config.igdb.token === undefined || config.igdb.clientId === undefined) throw new Error('igdbFetcher(): Both IGDB Token and Client ID needs to be set')

	const data = await monitorAsync(() => retry(() => fetch(`https://api.igdb.com/v4${url}`, {
		method: 'POST',
		body,
		headers: new Headers({
			Authorization: `Bearer ${config.igdb.token}`,
			'Client-ID': config.igdb.clientId,
			'Content-Type': 'text/plain',
			accept: 'application/json',
		}),
	}), 3, res), 'http:igdb', nickname ?? '', span)

	const result = shouldReturnFirst ? data[0] : data

	return result as ReturnType<T>
}
