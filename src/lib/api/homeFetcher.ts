import type { Transaction } from '@sentry/types'

import { startTransaction } from '@sentry/nextjs'
import pickBy from 'lodash/pickBy'
import { fetch, setGlobalDispatcher, Agent } from 'undici'

import { config } from 'config.server'

import { ApiError } from 'lib/errors'
import type { statusCodes } from 'lib/errors'
import { logger } from 'lib/logger'

setGlobalDispatcher(new Agent({
	connect: {
		// We are using a self-signed cert, so we are also creating a fetcher specifically for contacting that server
		rejectUnauthorized: false,
	},
}))

export enum Method {
	Put = 'PUT',
	Post = 'POST',
	Get = 'GET',
	Delete = 'DELETE',
	Patch = 'PATCH',
}

export type Options = {
	accessToken: string,
	body?: Record<string, any>,
	method?: Method,
}

export const homeFetcher = async <ReturnType>(
	url: string, { accessToken, body, method = Method.Get }: Options) => {
	const transaction = startTransaction({
		op: 'homeFetcher',
		name: `${method} - ${url}`,
		trimEnd: false,
	}, {
		http: {
			method,
		},
	}) as Transaction | null

	// Create headers object and remove falsy variables to exclude them from call
	const headers = pickBy({
		'Content-Type': 'application/json',
		Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
		'sentry-trace': transaction?.traceId ?? undefined,
	}, (value) => value !== undefined) as Record<string, string>

	const urlToFetch = `${config.smartHomeHost}/api${url}`
	return fetch(urlToFetch, {
		method,
		body: body ? JSON.stringify(body) : null,
		headers,
		credentials: 'same-origin',
		mode: 'cors',
	}).then(async (response) => {
		try {
			if (response.redirected || response.url !== urlToFetch) throw ApiError.fromCode(421)
			if (response.status >= 400) {
				const payload = await response.json() as { message?: string }
				logger.error(payload.message)
				throw ApiError.fromCodeWithError(
					response.status as unknown as keyof typeof statusCodes,
					new Error(payload.message ?? 'Unknown error'),
				)
			}

			return response.json() as Promise<ReturnType>
		} finally {
			if (transaction) {
				transaction.setHttpStatus(response.status)
				transaction.finish()
			}
		}
	})
}
