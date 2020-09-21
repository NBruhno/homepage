import { NextApiResponse } from 'next'
import { Span } from '@sentry/apm'

import { config } from 'config.server'

import { GameStatus } from 'types/IGDB'
import { Status } from 'types/Games'

import { ApiError } from './errors/ApiError'
import { monitorReturn } from './performanceCheck'

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

export const mapStatus = (status: GameStatus, span: Span): Status | null => monitorReturn(() => {
	switch (status) {
		case GameStatus.Released: return Status.Released
		case GameStatus.Alpha: return Status.Alpha
		case GameStatus.Beta: return Status.Beta
		case GameStatus.EarlyAccess: return Status.EarlyAccess
		case GameStatus.Offline: return Status.Offline
		case GameStatus.Rumored: return Status.Rumored
		default: return null
	}
}, 'mapStatus()', span)
