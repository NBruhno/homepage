import { NextApiResponse } from 'next'

import { config } from 'config.server'

import { ApiError } from 'server/errors/ApiError'

type Options = {
	body?: string,
	single?: boolean,
}

export const igdbFetcher = async <T>(url: RequestInfo, res: NextApiResponse, { body, single }: Options = {}): Promise<T> => {
	const data = await fetch(`https://api-v3.igdb.com${url}`, {
		method: 'POST',
		body,
		headers: new Headers({
			'user-key': config.igdb.userKey,
			'Content-Type': 'text/plain',
			accept: 'application/json',
		}),
	}).then((response) => response.json())

	if (data?.status >= 400) {
		const error = ApiError.fromCode(data.status)
		res.status(error.statusCode).json({ error: error.message })
		throw error
	}

	return single ? data[0] : data
}

export const igdbImageUrl = 'https://images.igdb.com/igdb/image/upload'
