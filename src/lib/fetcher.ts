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
	accessToken?: string,
	body?: Record<string, any>,
	contentType?: ContentType,
	method?: Method,
	credentials?: RequestCredentials,
	mode?: RequestMode,
	cacheControl?: string,
	absoluteUrl?: string,
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
export const fetcher = async <T>(
	url: RequestInfo, {
		accessToken, body, method = Method.Get, contentType = ContentType.JSON, absoluteUrl,
		credentials = 'same-origin', mode = 'cors', cacheControl = 's-maxage=60, stale-while-revalidate',
	}: Options = {}): Promise<T> => {
	// Create headers object and remove undefined variables to exclude them from call
	const headers = ({
		'Content-Type': contentType,
		'Cache-Control': cacheControl,
		Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
	})
	Object.keys(headers).forEach((key: keyof typeof headers) => headers[key] === undefined && delete headers[key])

	return fetch(url ? `${absoluteUrl ?? ''}/api${url}` : null, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		headers,
		credentials,
		mode,
	}).then((response) => {
		const responseContentType = response.headers.get('content-type')
		if (response.status >= 400) {
			throw new Error(response.statusText)
		}
		if (responseContentType === ContentType.Text) {
			return response.text()
		}

		return response.json()
	})
}
