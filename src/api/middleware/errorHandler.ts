import type { NextApiRequest, NextApiResponse } from 'next'

import { errors as faunaError } from 'faunadb'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { StructError } from 'superstruct'

import { logger } from 'lib/logger'

import { ApiError } from 'api/errors'

export const errorHandler = (error: unknown, _req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Cache-Control', 'no-cache')
	if (error instanceof ApiError) {
		return res.status(error.statusCode).json({ message: error.message })
	} else if (error instanceof StructError || error instanceof faunaError.BadRequest) {
		const badRequestError = ApiError.fromCode(400)
		return res.status(badRequestError.statusCode).json({ message: error.message, error })
	} else if (error instanceof faunaError.Unauthorized || error instanceof faunaError.PermissionDenied
		|| error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
		const unauthorizedError = ApiError.fromCode(401)
		return res.status(unauthorizedError.statusCode).json({ message: unauthorizedError.message })
	} else if (error instanceof faunaError.NotFound) {
		const notFoundError = ApiError.fromCode(404)
		return res.status(notFoundError.statusCode).json({ message: notFoundError.message })
	} else if (error instanceof faunaError.MethodNotAllowed) {
		const invalidMethodError = ApiError.fromCode(405)
		return res.status(invalidMethodError.statusCode).json({ message: invalidMethodError.message })
	} else {
		const unexpectedError = ApiError.fromCode(500)
		logger.error(error)
		return res.status(unexpectedError.statusCode).json({ message: unexpectedError.message })
	}
}
