import type { GameEventData } from './types'

import { isString } from 'es-toolkit'
import { useRouter } from 'next/compat/router'
import { useEffect } from 'react'
import useSwrInfinite from 'swr/infinite'

import { fetcher } from 'lib/fetcher'

const getKey = (pageIndex: number, previousData: GameEventData | undefined) => {
	const defaultLink = '/game-events'
	if (previousData && !previousData.after) return null
	if (pageIndex === 0 && !previousData) return defaultLink
	return `${defaultLink}?skip=${previousData ? (previousData.skip === 0 ? 1 : previousData.skip) + previousData.take : 0}`
}

export const useGameEvents = (preloadedGameEvents?: GameEventData) => {
	const query = useRouter()?.query ?? {}
	const { data, isLoading, size, setSize } = useSwrInfinite<GameEventData>(getKey, fetcher, {
		fallbackData: preloadedGameEvents ? [preloadedGameEvents] : undefined,
		keepPreviousData: true,
		revalidateAll: true,
		revalidateFirstPage: false,
		revalidateOnFocus: false,
	})

	const isLimitReached = data?.[data.length - 1].after === null

	useEffect(() => {
		if (isString(query.pages)) {
			const pages = parseInt(query.pages, 10)
			if (pages > size) void setSize(pages)
		}
		// We only want to update when the query gets updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query.pages])

	return {
		data,
		isLoading: !data || isLoading,
		size,
		setSize,
		isLimitReached,
	}
}
