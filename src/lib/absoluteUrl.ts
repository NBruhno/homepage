/**
 * Helper function that gets the absolute URL of a request.
 * @param req - The request in which you want the absolute URL
 * @example
 * ```tsx
 * const url = absoluteUrl(req)
 * ```
 */
export const absoluteUrl = (req?: any) => {
	let protocol = 'https'
	const host = req ? (req.headers['x-forwarded-host'] || req.headers['host']) : window.location.host
	if (host.indexOf('localhost') > -1) {
		protocol = 'http'
	}

	return { protocol, host, origin: `${protocol}://${host}` }
}
