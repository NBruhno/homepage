import type { GameData } from './types'

import useSWRInfinite from 'swr/infinite'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { fetcher } from 'lib/fetcher'

export type PopularGamesState = {
	isLimitReached: boolean,
	take: number,
	setIsLimitReached: (isLimitReached: boolean) => void,
}

export const usePopularGamesStore = create<PopularGamesState>()(devtools((set) => ({
	isLimitReached: false,
	take: 50,
	setIsLimitReached: (isLimitReached) => set({ isLimitReached }, false, 'setIsLimitReached'),
}), { anonymousActionType: 'usePopularGamesStore' }))

const getKey = (pageIndex: number, previousData: GameData | undefined) => {
	if (previousData && !previousData.after) return null
	if (pageIndex === 0 && !previousData) return `/games?is-popular=yes`
	return `/games?is-popular=yes&skip=${previousData ? (previousData.skip === 0 ? 1 : previousData.skip) + previousData.take : 0}`
}

export const usePopularGames = (preloadedGames?: GameData) => {
	const { data, isLoading, size, setSize } = useSWRInfinite<GameData>(
		getKey,
		fetcher,
		{
			revalidateOnFocus: false,
			fallbackData: preloadedGames ? [preloadedGames] : undefined,
			revalidateFirstPage: false,
			keepPreviousData: true,
		},
	)

	const isLimitReached = data?.[data.length]?.after === null

	return {
		games: data,
		isLoading: !data || isLoading,
		setIsLimitReached: usePopularGamesStore((state) => state.setIsLimitReached),
		size,
		setSize,
		isLimitReached,
	}
}
