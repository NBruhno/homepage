import type { GameData } from './types'

import { isString } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'

import { fetcher } from 'lib/fetcher'

const getKey = (pageIndex: number, previousData: GameData | undefined) => {
	const defaultLink = '/games?is-popular=yes'
	if (previousData && !previousData.after) return null
	if (pageIndex === 0 && !previousData) return defaultLink
	return `${defaultLink}&skip=${previousData ? (previousData.skip === 0 ? 1 : previousData.skip) + previousData.take : 0}`
}

export const usePopularGames = (preloadedGames?: GameData) => {
	const router = useRouter()
	const { data, isLoading, size, setSize } = useSWRInfinite<GameData>(
		getKey,
		fetcher,
		{
			fallbackData: preloadedGames ? [preloadedGames] : undefined,
			keepPreviousData: true,
			revalidateAll: true,
			revalidateFirstPage: false,
			revalidateOnFocus: false,
		},
	)

	const isLimitReached = data?.[data.length - 1].after === null

	useEffect(() => {
		if (isString(router.query.pages)) {
			const pages = parseInt(router.query.pages, 10)
			if (pages > size) void setSize(pages)
		}
		// We only want to update when the query gets updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.pages])

	return {
		games: data,
		isLoading: !data || isLoading,
		size,
		setSize,
		isLimitReached,
	}
}
