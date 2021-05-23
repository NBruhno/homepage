/* eslint-disable no-underscore-dangle */

import type { NextApiRequest, NextApiResponse } from 'next'
import type { MockRequest, MockResponse } from 'node-mocks-http'

import { startTransaction } from '@sentry/nextjs'

type Request = MockRequest<NextApiRequest>
type Response = MockResponse<NextApiResponse>

export const transaction = startTransaction({
	op: 'test',
	name: 'API test',
	trimEnd: false,
})

export const testingCredentials = process.env.TESTING_CREDENTIALS
export const testingToken = process.env.TESTING_TOKEN
export const testingUserId = '273823504333275653'
export const accessTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6ImFjY2VzcyJ9/i
export const intermediateTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6ImludGVybWVkaWF0ZSJ9/i
export const refreshTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6InJlZnJlc2gifQ/i

export const parseJson = (res: Response) => res._getJSONData()
export const parseHeaders = (res: Response) => res._getHeaders()

export const expectStatusCode = (res: Response, code: number) => {
	expect(res._getStatusCode()).toBe(code)
}

export const expectSpecificObject = (res: Response, object: {}) => {
	expect(parseJson(res)).toEqual(expect.objectContaining(object))
}

export const retryFunction = async <T>(fetchFunction: (req: Request, res: Response, ...rest: any) =>
Promise<T>, req: Request, res: Response, retries: number, ...rest: any): Promise<T> => {
	try {
		return await fetchFunction(req, res, ...rest)
	} catch (error) {
		if (retries === 1) throw error
		return retryFunction<T>(fetchFunction, req, res, retries - 1)
	}
}
