import { startTransaction } from '@sentry/nextjs'

export enum ContentType {
	Text = 'text/plain',
	JSON = 'application/json',
}

export enum Method {
	Put = 'PUT',
	Post = 'POST',
	Get = 'GET',
	Delete = 'DELETE',
	Patch = 'PATCH',
}

export type Options = {
	absoluteUrl?: string,
	accessToken?: string,
	body?: Record<string, any>,
	cacheControl?: string,
	contentType?: ContentType,
	credentials?: RequestCredentials,
	customHeaders?: Record<string, any>,
	method?: Method,
	mode?: RequestMode,
}

/**
 * Helper function for fetching resources using `useSWR()` or as a normal fetch. Default method is GET.
 * @param options - a set of options to transform the fetch call.
 * @param url - the resource to fetch.
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
	url: RequestInfo, {
		accessToken, body, method = Method.Get, contentType = ContentType.JSON, absoluteUrl,
		credentials = 'same-origin', mode = 'cors', cacheControl, customHeaders,
	}: Options = {}): Promise<ReturnType> => {
	const transaction = startTransaction({
		op: 'fetcher',
		name: `${method} - ${url}`,
		trimEnd: false,
	}, {
		http: {
			method,
		},
	})

	// Create headers object and remove undefined variables to exclude them from call
	const headers = ({
		'Content-Type': contentType,
		'Cache-Control': cacheControl,
		Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
		'sentry-trace': transaction.traceId,
		...customHeaders,
	}) as Record<string, string>
	Object.keys(headers).forEach((key) => headers[key] === undefined && delete headers[key])

	return fetch(`${absoluteUrl ?? ''}/api${url}`, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		headers,
		credentials,
		mode,
	}).then((response) => {
		try {
			const responseContentType = response.headers.get('content-type')
			if (response.status >= 400) {
				throw new Error(response.statusText)
			}
			if (responseContentType === ContentType.Text) {
				return response.text()
			}

			return response.json()
		} finally {
			transaction.setHttpStatus(response.status)
			transaction.finish()
		}
	})
}
