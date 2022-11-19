import type { NextApiRequest, NextApiResponse } from 'next'

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { StructError } from 'superstruct'

import { updateTransaction } from 'lib/api'
import { ApiError } from 'lib/errors'
import { logger } from 'lib/logger'

// const deriveTypesFromObject = (payload: Record<string, unknown>): Record<string, unknown> => Object.fromEntries(Object
// 	.entries(payload)
// 	.map(([key, value]) => {
// 		if (Array.isArray(value)) return [key, 'array']
// 		if (typeof value === 'object') return [key, deriveTypesFromObject(value as Record<string, unknown>)]
// 		return [key, typeof value]
// 	})) as Record<string, unknown>

const shouldLogWarnings = process.env.NODE_ENV !== 'test'

export const errorHandler = (error: Error, _req: NextApiRequest, res: NextApiResponse) => {
	// We want to make sure error responses are not cached
	res.setHeader('Cache-Control', 'no-cache')

	if (error instanceof ApiError) {
		if (shouldLogWarnings) logger.warn(error)
		updateTransaction({ status: error.statusCode })
		return res.status(error.statusCode).json({ message: error.message })
	} else if (error instanceof StructError) {
		const badRequestError = ApiError.fromCodeWithError(400, error)
		if (shouldLogWarnings) logger.warn(badRequestError)
		updateTransaction({ status: badRequestError.statusCode })
		return res.status(badRequestError.statusCode).json({ message: error.message, error })
	} else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
		const unauthorizedError = ApiError.fromCodeWithCause(401, error)
		if (shouldLogWarnings) logger.warn(unauthorizedError)
		updateTransaction({ status: unauthorizedError.statusCode })
		return res.status(unauthorizedError.statusCode).json({ message: unauthorizedError.message })
	// } else if (false) {
	// 	const notFoundError = ApiError.fromCodeWithError(404, error)
	// 	return res.status(notFoundError.statusCode).json({ message: notFoundError.message })
	// } else if (false) {
	// 	const invalidMethodError = ApiError.fromCodeWithError(405, error)
	// 	return res.status(invalidMethodError.statusCode).json({ message: invalidMethodError.message })
	} else {
		const unexpectedError = ApiError.fromCodeWithCause(500, error)
		updateTransaction({ status: unexpectedError.statusCode })
		logger.error(error)
		return res.status(unexpectedError.statusCode).json({ message: unexpectedError.message })
	}
}
