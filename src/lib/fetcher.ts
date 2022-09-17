import pickBy from 'lodash/pickBy'

import { ApiError } from 'lib/errors'
import type { statusCodes } from 'lib/errors'

import { logger } from './logger'

export enum Method {
	Put = 'PUT',
	Post = 'POST',
	Get = 'GET',
	Delete = 'DELETE',
	Patch = 'PATCH',
}

export type Options = {
	absoluteUrl?: string,
	accessToken?: string | undefined,
	body?: Record<string, any>,
	cacheControl?: string,
	credentials?: RequestCredentials,
	customHeaders?: Record<string, any>,
	method?: Method,
	mode?: RequestMode,
}

/**
 * Helper function for fetching resources using `useSWR()` or as a normal fetch. Default method is GET.
 * @param url - the resource to fetch.
 * @param options - a set of options to transform the fetch call.
 * @example
 * ```tsx
 * const { data: test, error } = useSWR('/tests', fetcher)
 * ```
 * @example
 * ```tsx
 * fetcher('/tests', { method: Method.Post })
 * ```
 */
export const fetcher = async <ReturnType>(
	url: string, {
		accessToken, body, method = Method.Get, absoluteUrl,
		credentials = 'same-origin', mode = 'cors', cacheControl, customHeaders,
	}: Options = {}) => {
	// Create headers object and remove falsy variables to exclude them from call
	const headers = pickBy({
		'Content-Type': 'application/json',
		'Cache-Control': cacheControl,
		Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
		...customHeaders,
	}, (value) => value !== undefined) as Record<string, string>

	return fetch(`${absoluteUrl ?? ''}/api${url}`, {
		method,
		body: body ? JSON.stringify(body) : null,
		headers,
		credentials,
		mode,
	}).then(async (response) => {
		if (response.status >= 400) {
			const payload = await response.json() as { message?: string }
			logger.error(payload.message)
			throw ApiError.fromCodeWithError(
				response.status as unknown as keyof typeof statusCodes,
				new Error(payload.message ?? 'Unknown error'),
			)
		}

		return response.json() as Promise<ReturnType>
	})
}
