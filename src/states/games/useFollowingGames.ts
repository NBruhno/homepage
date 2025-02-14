import type { GameData } from './types'

import { useRouter } from 'next/compat/router'
import { isString } from 'radash'
import { useEffect } from 'react'
import useSwrInfinite from 'swr/infinite'

import { fetcher } from 'lib/fetcher'

const getKey = (userId: string | null) => (pageIndex: number, previousData: GameData | undefined) => {
	if ((previousData && !previousData.after) ?? !userId) return null
	const defaultLink = `/games?user=${userId}`
	if (pageIndex === 0 && !previousData) return defaultLink
	return `${defaultLink}&skip=${previousData ? (previousData.skip === 0 ? 1 : previousData.skip) + previousData.take : 0}`
}

export const useFollowingGames = (userId: string | null) => {
	const query = useRouter()?.query ?? {}
	const { data, isLoading, size, setSize } = useSwrInfinite<GameData>(getKey(userId), fetcher, {
		keepPreviousData: true,
		revalidateAll: true,
		revalidateFirstPage: false,
		revalidateOnFocus: false,
		revalidateOnMount: true,
	})

	useEffect(() => {
		if (isString(query.pages)) {
			const pages = parseInt(query.pages, 10)
			if (pages > size) void setSize(pages)
		}
		// We only want to update when the query gets updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query.pages])

	const isLimitReached = data?.[data.length - 1].after === null

	return {
		games: data,
		isLoading: !data || isLoading,
		size,
		setSize,
		isLimitReached,
	}
}
