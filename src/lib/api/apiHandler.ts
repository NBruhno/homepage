import type { NextApiRequest, NextApiResponse } from 'next'

import nc from 'next-connect'

import { errorHandler, noMatchHandler, withCaching, withTracking } from 'lib/middleware'

type Options = {
	/** To properly figure out when a call hit a valid method or not, we need to specify which are being used, eg. `['GET', 'POST']` */
	validMethods: Parameters<typeof noMatchHandler>[0],
	/** Vercel does not cache Lambdas per default (https://vercel.com/docs/edge-network/caching#serverless-functions-(lambdas))
	 * so the caching strategy has to be applied manually (but not always on a per-resource level).
	 */
	cacheStrategy?: Parameters<typeof withCaching>[0]['strategy'],
	/** In minutes, defaults to `1` */
	cacheDuration?: Parameters<typeof withCaching>[0]['duration'],
	/** Apply a name to the Sentry transaction. Name defaults to `METHOD /api/for/the/route` */
	transactionName?: Parameters<typeof withTracking>[0]['name'],
}

/** Default API handler for the Nextjs routes. It has error handling and options for cache and performance tracking.
 * The cache does not need to be set on a per-resource-basis, but can be set individually. This creates a handler using
 * on `next-connect`.
 * @example
 * ```ts
 * const handler = apiHandler({ validMethods: ['GET'], cacheStrategy: 'NoCache' }).get((req, res) => { ... })
 * ```
*/
export const apiHandler = (
	{
		validMethods,
		cacheStrategy = null,
		cacheDuration,
		transactionName,
	}: Options,
) => (
	nc<NextApiRequest, NextApiResponse>({ onError: errorHandler, onNoMatch: noMatchHandler(validMethods) })
		.use(withCaching({ strategy: cacheStrategy ?? null, duration: cacheDuration }))
		.use(withTracking({ name: transactionName }))
)
