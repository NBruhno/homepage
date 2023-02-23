import type { GameData } from './types'

import { useEffect } from 'react'
import useSWR from 'swr'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { useLoading } from 'states/page'

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

export const usePopularGames = (newSkip = 0) => {
	const { data } = useSWR<GameData>(
		['/games', newSkip],
		([link, skip]: [string, number]) => fetcher<GameData>(`${link}?is-popular=yes${skip ? `&skip=${skip}` : ''}`),
		{ revalidateOnFocus: false },
	)

	const setIsLimitReached = usePopularGamesStore((state) => state.setIsLimitReached)
	const { setIsLoading } = useLoading()
	useEffect(() => {
		setIsLimitReached(data?.after === null)
		setIsLoading(Boolean(!data))
	}, [data, setIsLimitReached, setIsLoading])

	return {
		games: data?.games,
		after: data?.after,
		setIsLimitReached: usePopularGamesStore((state) => state.setIsLimitReached),
	}
}
