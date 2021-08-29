import type { NextApiResponse } from 'next'

type Props = {
	res: NextApiResponse,
	strategy: 'NoCache' | 'StaleWhileRevalidate' | 'Default',
	/** In minutes, defaults to 1 */
	duration?: number | undefined,
}

/** Applies a `Cache-Control` header depending on the cache strategy provided */
export const setCache = ({
	strategy,
	res,
	duration = 1,
}: Props) => {
	const setCacheHeader = (value: string) => res.setHeader('Cache-Control', value)
	switch (strategy) {
		case 'NoCache': {
			setCacheHeader('no-cache')
			break
		}
		case 'StaleWhileRevalidate': {
			setCacheHeader(`s-maxage=${60 * duration}, stale-while-revalidate`)
			break
		}
		case 'Default': {
			setCacheHeader(`s-maxage=${60 * duration}`)
			break
		}
	}
}
