/* eslint-disable no-underscore-dangle */

export const testingCredentials = process.env.TESTING_CREDENTIALS
export const testingToken = process.env.TESTING_TOKEN
export const accessTokenMatch = /eyJ0eXAiOiJhY2Nlc3MiLCJhbGciOiJSUzI1NiIsImtpZCI6IjF4eDdEamNWeVl0UWtmcTJvbFBrTnRKaWJMN2VhVmVtVXAyM3NabW5ISmsifQ/i
export const intermediateTokenMatch = /eyJ0eXAiOiJpbnRlcm1lZGlhdGUiLCJhbGciOiJSUzI1NiIsImtpZCI6IjF4eDdEamNWeVl0UWtmcTJvbFBrTnRKaWJMN2VhVmVtVXAyM3NabW5ISmsifQ/i
export const refreshTokenMatch = /eyJ0eXAiOiJyZWZyZXNoIiwiYWxnIjoiUlMyNTYiLCJraWQiOiIxeHg3RGpjVnlZdFFrZnEyb2xQa050SmliTDdlYVZlbVVwMjNzWm1uSEprIn0/i

export const parseJson = (res: any) => res._getJSONData()
export const parseHeaders = (res: any) => res._getHeaders()

export const expectStatusCode = (res: any, code: number) => {
	expect(res._getStatusCode()).toBe(code)
}

export const expectSpecificObject = (res: any, object: {}) => {
	expect(parseJson(res)).toEqual(expect.objectContaining(object))
}

export const retryFunction = async <T>(fetchFunction: (req: any, res: any) => Promise<T>, res: any, req: any, retries: number): Promise<T> => {
	try {
		return await fetchFunction(req, res)
	} catch (error) {
		if (retries === 1) throw error
		return retryFunction<T>(fetchFunction, req, res, retries - 1)
	}
}
