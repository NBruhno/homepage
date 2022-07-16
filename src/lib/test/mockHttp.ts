/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next'
import type { MockResponse, RequestOptions, ResponseOptions } from 'node-mocks-http'

import { createMocks } from 'node-mocks-http'

export const createHttpMock = <T>({ reqOptions, resOptions }: { reqOptions?: RequestOptions, resOptions?: ResponseOptions } = {}) => (
	createMocks<NextApiRequest, NextApiResponse<T>>(reqOptions, resOptions)
)

export const parseHeaders = (res: MockResponse<NextApiResponse>) => res._getHeaders()
