import type { NextApiRequest, NextApiResponse } from 'next'

import { updateTransaction } from 'lib/api'
import { ApiError } from 'lib/errors'

/** Handles scenarios where `next-connect` does not find any match for the request.
 * The function is supplied with the used methods of the route to help detect if it's a `404` or a `405` when it misses.
 */
export const noMatchHandler = (methods: Array<'DELETE' | 'GET' | 'METHOD' | 'PATCH' | 'POST' | 'PUT'>) => (req: NextApiRequest, res: NextApiResponse) => {
	// @ts-expect-error We do not know what the req.method is ahead of time (we can only guess), hence it is always a string or undefined
	if (methods.includes(req.method ?? '')) {
		const apiError = ApiError.fromCode(404)
		updateTransaction({ status: apiError.statusCode })
		res.status(apiError.statusCode).json({ message: apiError.message })
	} else {
		const apiError = ApiError.fromCode(405)
		updateTransaction({ status: apiError.statusCode })
		res.setHeader('Allow', methods)
		res.status(apiError.statusCode).json({ message: apiError.message })
	}
}
