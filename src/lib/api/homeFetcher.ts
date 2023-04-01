import type { Span } from '@sentry/types'

import { pickBy } from 'lodash'
import { fetch, setGlobalDispatcher, Agent } from 'undici'

import { config } from 'config.server'

import { ApiError } from 'lib/errors'
import type { statusCodes } from 'lib/errors'
import { logger } from 'lib/logger'
import { monitorAsync } from 'lib/sentryMonitor'

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
	nickname?: string,
	span?: Span,
}

export const homeFetcher = async <ReturnType>(url: string, { accessToken, body, method = Method.Get, nickname, span }: Options) => {
	const urlToFetch = `${config.smartHomeHost}/api${url}`
	return monitorAsync((span) => fetch(urlToFetch, {
		method,
		body: body ? JSON.stringify(body) : null,
		// Create headers object and remove falsy variables to exclude them from call
		headers: pickBy({
			'Content-Type': 'application/json',
			Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
			'sentry-trace': span?.traceId,
		}, (value) => value !== undefined) as Record<string, string>,
		credentials: 'same-origin',
		mode: 'cors',
	}).then(async (response) => {
		if (response.redirected || response.url !== urlToFetch) throw ApiError.fromCodeWithCause(421, new Error('Response was redirected or the respondent did not match what was expected'))
		if (response.status >= 400) {
			const payload = await response.json() as { message?: string }
			logger.error(payload.message)
			throw ApiError.fromCodeWithCause(500, ApiError.fromCode(response.status as unknown as keyof typeof statusCodes, payload.message))
		}
		return response.json() as Promise<ReturnType>
	}), 'http:home', nickname ?? '', span)
}
