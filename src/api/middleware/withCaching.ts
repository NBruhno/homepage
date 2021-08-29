import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextHandler } from 'next-connect'

import { setCache } from 'api/utils'

type Props = {
	strategy: Parameters<typeof setCache>[0]['strategy'] | null,
	duration: Parameters<typeof setCache>[0]['duration'],
}

/** A `Cache-Control` header middleware for setting cache depending on the type provided.
 * Intended to be used for setting the cache control for the whole resource.
 */
export const withCaching = ({ strategy, duration }: Props) => (
	(_req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
		if (strategy) {
			setCache({ strategy, duration, res })
		}
		next()
	}
)
