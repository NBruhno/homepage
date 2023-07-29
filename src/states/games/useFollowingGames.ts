import type { GameData } from './types'

import { isString } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'

import { fetcher } from 'lib/fetcher'

const getKey = (userId: string | null) => (pageIndex: number, previousData: GameData | undefined) => {
	if ((previousData && !previousData.after) ?? !userId) return null
	const defaultLink = `/games?user=${userId}`
	if (pageIndex === 0 && !previousData) return defaultLink
	return `${defaultLink}&skip=${previousData ? (previousData.skip === 0 ? 1 : previousData.skip) + previousData.take : 0}`
}

export const useFollowingGames = (userId: string | null) => {
	const router = useRouter()
	const { data, isLoading, size, setSize } = useSWRInfinite<GameData>(
		getKey(userId),
		fetcher,
		{
			keepPreviousData: true,
			revalidateAll: true,
			revalidateFirstPage: false,
			revalidateOnFocus: false,
			revalidateOnMount: true,
		},
	)

	useEffect(() => {
		if (isString(router.query.pages)) {
			const pages = parseInt(router.query.pages, 10)
			if (pages > size) void setSize(pages)
		}
		// We only want to update when the query gets updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.pages])

	const isLimitReached = data?.[data.length - 1].after === null

	return {
		games: data,
		isLoading: !data || isLoading,
		size,
		setSize,
		isLimitReached,
	}
}
