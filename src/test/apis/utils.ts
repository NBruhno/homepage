/* eslint-disable no-underscore-dangle */

export const parseJson = (res: any) => JSON.parse(res._getData())

export const expectStatusCode = (res: any, code: number) => {
	expect(res._getStatusCode()).toBe(code)
}

export const expectSpecificObject = (res: any, object: {}) => {
	expect(parseJson(res)).toEqual(expect.objectContaining(object))
}
