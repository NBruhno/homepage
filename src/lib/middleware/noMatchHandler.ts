import type { NextApiRequest, NextApiResponse } from 'next'

import { updateTransaction } from 'lib/api'
import { ApiError } from 'lib/errors'

/** Handles scenarios where `next-connect` does not find any match for the request.
 * The function is supplied with the used methods of the route to help detect if it's a `404` or a `405` when it misses.
 */
export const noMatchHandler = (methods: Array<'DELETE' | 'GET' | 'METHOD' | 'PATCH' | 'POST' | 'PUT'>) => (req: NextApiRequest, res: NextApiResponse) => {
	// @ts-expect-error We do not know what the req.method is ahead of time (we can only guess), hence it is always a string or undefined
	if (methods.includes(req.method ?? '')) {
		const apiError = ApiError.fromCodeWithCause(404, new Error(`Could not find any matching route with the given method. Received "${req.method ?? 'UNSPECIFIED'}" - "${req.url ?? 'Unknown URL'}"`))
		updateTransaction({ status: apiError.statusCode })
		res.status(apiError.statusCode).json({ message: apiError.message })
	} else {
		const apiError = ApiError.fromCodeWithCause(405, new Error(`Method not allowed. Expected one of [${methods.join(', ')}] but received "${req.method ?? 'UNSPECIFIED'}"`))
		updateTransaction({ status: apiError.statusCode })
		res.setHeader('Allow', methods)
		res.status(apiError.statusCode).json({ message: apiError.message })
	}
}
