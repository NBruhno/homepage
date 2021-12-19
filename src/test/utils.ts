/* eslint-disable no-underscore-dangle */

import type { IncomingMessage, ServerResponse } from 'http'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { MockResponse, RequestOptions, ResponseOptions } from 'node-mocks-http'
import type { Response, Test } from 'supertest'

import { createServer } from 'http'

import { startTransaction } from '@sentry/nextjs'
import { apiResolver } from 'next/dist/server/api-utils'
import { createMocks } from 'node-mocks-http'

type ExtendedMockResponse = MockResponse<NextApiResponse>

export const transaction = startTransaction({
	op: 'test',
	name: 'API test',
	trimEnd: false,
})

export const testingCredentials = process.env.TESTING_CREDENTIALS!
export const testingToken = process.env.TESTING_TOKEN!
export const testingAccessCode = process.env.ACCESS_CODE!
export const testingUserId = '273823504333275653'
export const accessTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6ImFjY2VzcyJ9/i
export const intermediateTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6ImludGVybWVkaWF0ZSJ9/i
export const refreshTokenMatch = /eyJhbGciOiJSUzI1NiIsInR5cCI6InJlZnJlc2gifQ/i

export const parseHeaders = (res: ExtendedMockResponse) => res._getHeaders()

export const retryFunction = async (fetchFunction: () => Test, retries: number): Promise<Response> => {
	const result = await fetchFunction()
	if (result.status >= 300) return result
	else if (retries !== 1) return retryFunction(fetchFunction, retries - 1)
	else return result
}

export const createTestServer = (handler: NextApiHandler, query?: Record<string, any>) => {
	const requestHandler = (req: IncomingMessage, res: ServerResponse) => apiResolver(
		req,
		res,
		query,
		handler,
		{
			previewModeEncryptionKey: '',
			previewModeId: '',
			previewModeSigningKey: '',
		},
		true,
	)
	const server = createServer(requestHandler)

	return server
}

export const createHttpMock = <T>({ reqOptions, resOptions }: { reqOptions?: RequestOptions, resOptions?: ResponseOptions } = {}) => (
	createMocks<NextApiRequest, NextApiResponse<T>>(reqOptions, resOptions)
)
