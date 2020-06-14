/**
 * Helper function for fetching resources using `useSWR()`.
 * @param url - the URL to fetch
 * @example
 * ```tsx
 * const { data: test, error } = useSWR('/api/tests', fetcher)
 * ```
 */
export const fetcher = (url: string) => fetch(url).then((response) => response.json())
