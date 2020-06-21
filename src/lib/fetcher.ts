/**
 * Helper function for fetching resources using `useSWR()`.
 * @param url - the URL to fetch
 * @example
 * ```tsx
 * const { data: test, error } = useSWR('/api/tests', fetcher)
 * ```
 */
export const fetcher = (url: string) => fetch(url).then((response) => response.json())

/**
 * Helper function for fetching resources using `useSWR()` from IGDB.
 * @param url - the URL to fetch
 * @example
 * ```tsx
 * const { data: test, error } = useSWR('/api/tests', IGDBFetcher)
 * ```
 */
export const IGDBFetcher = (url: string, body?: Record<string, any>) => fetch(url, {
	method: 'POST',
	body: body ? JSON.stringify(body) : undefined,
	headers: new Headers({
		'Content-Type': 'application/json',
	}),
}).then((response) => response.json())
