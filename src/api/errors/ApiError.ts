import type { NextApiResponse } from 'next'

import { CustomError } from 'ts-custom-error'

export const statusCodes = {
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1 */
	400: 'Bad Request',
	/** RFC 7235 https://datatracker.ietf.org/doc/html/rfc7235#section-3.1 */
	401: 'Unauthorized',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.2 */
	402: 'Payment Required',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3 */
	403: 'Forbidden',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4 */
	404: 'Not Found',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5 */
	405: 'Method Not Allowed',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.6 */
	406: 'Not Acceptable',
	/** RFC 7235 https://datatracker.ietf.org/doc/html/rfc7235#section-3.2 */
	407: 'Proxy Authentication Required',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.7 */
	408: 'Request Timeout',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.8 */
	409: 'Conflict',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.9 */
	410: 'Gone',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.10 */
	411: 'Length Required',
	/** RFC 7232 https://datatracker.ietf.org/doc/html/rfc7232#section-4.2 */
	412: 'Precondition Failed',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.11 */
	413: 'Payload Too Large',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.12 */
	414: 'URI Too Long',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.13 */
	415: 'Unsupported Media Type',
	/** RFC 7233 https://datatracker.ietf.org/doc/html/rfc7233#section-4.4 */
	416: 'Range Not Satisfiable',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.14 */
	417: 'Expectation Failed',
	/** RFC 2324 https://datatracker.ietf.org/doc/html/rfc2324#section-2.3.2 */
	418: `I'm a teapot`,
	/** RFC 7540 https://datatracker.ietf.org/doc/html/rfc7540#section-9.1.2 */
	421: 'Misdirected Request',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.15 */
	426: 'Upgrade Required',
	/** RFC 6585 https://datatracker.ietf.org/doc/html/rfc6585#section-3 */
	428: 'Precondition Required',
	/** RFC 6585 https://datatracker.ietf.org/doc/html/rfc6585#section-4 */
	429: 'Too Many Requests',
	/** RFC 6585 https://datatracker.ietf.org/doc/html/rfc6585#section-5 */
	431: 'Request Header Fields Too Large',
	/** RFC 7725 https://datatracker.ietf.org/doc/html/rfc7725#section-3 */
	451: 'Unavailable For Legal Reasons',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1 */
	500: 'Internal Server Error',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.2 */
	501: 'Not Implemented',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.3 */
	502: 'Bad Gateway',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.4 */
	503: 'Service Unavailable',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.5 */
	504: 'Gateway Timeout',
	/** RFC 7231 https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.6 */
	505: 'HTTP Version Not Supported',
	/** RFC 2295 https://datatracker.ietf.org/doc/html/rfc2295#section-8.1 */
	506: 'Variant Also Negotiates',
	/** RFC 2774 https://datatracker.ietf.org/doc/html/rfc2774#section-7 */
	510: 'Not Extended',
	/** RFC 6585 https://datatracker.ietf.org/doc/html/rfc6585#section-6 */
	511: 'Network Authentication Required',
}

export class ApiError extends CustomError {
	public statusCode: number
	public error?: Error

	public constructor(code: number, message: string, error?: Error) {
		super(message)

		if (error) this.error = error
		this.statusCode = code
	}

	public static fromCode(code: keyof typeof statusCodes) {
		return new ApiError(code, statusCodes[code])
	}

	public static fromCodeWithError(code: keyof typeof statusCodes, error: Error) {
		return new ApiError(code, error.message, error)
	}
}

/**
 * @param statusCode - Any HTTP status code
 * @param res - The Next.js response object
 * @param error - Any Error class
 * @returns ApiError class
 */
export const createAndAttachError = (statusCode: keyof typeof statusCodes, res: NextApiResponse, error?: Error) => {
	let apiError
	if (error) apiError = ApiError.fromCodeWithError(statusCode, error)
	else apiError = ApiError.fromCode(statusCode)
	res.status(apiError.statusCode).json({ error: error?.message ?? apiError.message })
	return apiError
}
