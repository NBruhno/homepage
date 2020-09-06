/* eslint-disable no-underscore-dangle */
import { NextApiRequest, NextApiResponse } from 'next'
import { MockRequest, MockResponse } from 'node-mocks-http'

type Request = MockRequest<NextApiRequest>
type Response = MockResponse<NextApiResponse>

export const testingCredentials = process.env.TESTING_CREDENTIALS
export const testingToken = process.env.TESTING_TOKEN
export const testingUserId = '273823504333275653'
export const accessTokenMatch = /eyJ0eXAiOiJhY2Nlc3MiLCJhbGciOiJSUzI1NiIsImtpZCI6IjF4eDdEamNWeVl0UWtmcTJvbFBrTnRKaWJMN2VhVmVtVXAyM3NabW5ISmsifQ/i
export const intermediateTokenMatch = /eyJ0eXAiOiJpbnRlcm1lZGlhdGUiLCJhbGciOiJSUzI1NiIsImtpZCI6IjF4eDdEamNWeVl0UWtmcTJvbFBrTnRKaWJMN2VhVmVtVXAyM3NabW5ISmsifQ/i
export const refreshTokenMatch = /eyJ0eXAiOiJyZWZyZXNoIiwiYWxnIjoiUlMyNTYiLCJraWQiOiIxeHg3RGpjVnlZdFFrZnEyb2xQa050SmliTDdlYVZlbVVwMjNzWm1uSEprIn0/i

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
