/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextConnect } from 'next-connect'
import type { JsonObject } from 'type-fest'

import supertest from 'supertest'

import { createTestServer } from './createTestServer'

import { type TestResponse } from '.'

type Props = {
	path: string,
	query?: Record<string, string>,
	handler: NextConnect<NextApiRequest, NextApiResponse>,
	/** Defaults to `get` */
	method?: 'delete' | 'get' | 'patch' | 'post' | 'put',
	body?: JsonObject,
	authToken?: string,
	headers?: Record<string, string>,
}

export const fetchFromServer = async <TBody = Record<string, any> | undefined, THeaders = Record<string, Array<string> | string | undefined>>
({ path, query = {}, handler, method = 'get', body: requestBody, headers: requestHeaders = {}, authToken }: Props): Promise<{ body: TBody, headers: THeaders, status: number }> => {
	const server = createTestServer(handler, query)

	const response = await supertest(server)[method](path)
		.query(query)
		.set({
			Authorization: authToken ? `Bearer ${authToken}` : '',
			...requestHeaders,
		})
		.send(requestBody) as unknown as TestResponse & { body: TBody, headers: THeaders }

	server.close()

	return { body: response.body, headers: response.headers, status: response.status }
}
