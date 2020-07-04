export enum ContentType {
	Text = 'text/plain',
	JSON = 'application/json'
}

export enum Method {
	Put = 'PUT',
	Post = 'POST',
	Get = 'GET',
	Delete = 'DELETE'
}

export type Options = {
	accessToken?: string,
	body?: Record<string, any>,
	contentType?: ContentType,
	method?: Method,
}

/**
 * Helper function for fetching resources using `useSWR()`.
 * @param url - the resource to fetch.
 * @param options - a set of options to transform the fetch call.
 * @example
 * ```tsx
 * const { data: test, error } = useSWR('/api/tests', fetcher)
 * ```
 */
export const fetcher = async (url: string, options?: Options) => {
	const validOptions = options || {}
	const { accessToken, body, method = Method.Get, contentType = ContentType.JSON } = validOptions
	return fetch(url ? `/api${url}` : null, {
		method,
		body: body ? JSON.stringify(body) : undefined,
		headers: new Headers({
			'Content-Type': contentType,
			Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
		}),
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
