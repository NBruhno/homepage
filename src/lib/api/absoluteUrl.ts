import type { NextApiRequest } from 'next'

/**
 * Helper function that gets the absolute URL of a request.
 * @param req - The request in which you want the absolute URL
 * @example
 * ```tsx
 * const url = absoluteUrl(req)
 * ```
 */
export const absoluteUrl = (req?: NextApiRequest) => {
	let protocol = 'https'
	const host = req ? (req.headers['x-forwarded-host'] ?? req.headers['host']) : window.location.host
	if (host?.includes('localhost')) {
		protocol = 'http'
	}

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return { protocol, host, origin: host ? `${protocol}://${host}` : undefined }
}
