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

export const errorHandler = (error: unknown, _req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Cache-Control', 'no-cache')
	if (error instanceof ApiError) {
		updateTransaction({ status: error.statusCode })
		return res.status(error.statusCode).json({ message: error.message })
	} else if (error instanceof StructError) {
		const badRequestError = ApiError.fromCode(400)
		updateTransaction({ status: badRequestError.statusCode })
		return res.status(badRequestError.statusCode).json({ message: error.message, error })
	} else if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
		const unauthorizedError = ApiError.fromCode(401)
		updateTransaction({ status: unauthorizedError.statusCode })
		return res.status(unauthorizedError.statusCode).json({ message: unauthorizedError.message })
	// } else if (false) {
	// 	const notFoundError = ApiError.fromCode(404)
	// 	return res.status(notFoundError.statusCode).json({ message: notFoundError.message })
	// } else if (false) {
	// 	const invalidMethodError = ApiError.fromCode(405)
	// 	return res.status(invalidMethodError.statusCode).json({ message: invalidMethodError.message })
	} else {
		const unexpectedError = ApiError.fromCode(500)
		updateTransaction({ status: unexpectedError.statusCode })
		logger.error(error)
		return res.status(unexpectedError.statusCode).json({ message: unexpectedError.message })
	}
}
