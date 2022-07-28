import type { GameData, PageData } from './types'
import type { GameSimple } from 'types'

import { useEffect } from 'react'
import useSWR from 'swr'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { useLoading } from 'states/page'

import { fetcher } from 'lib/fetcher'

export type PopularGamesState = Partial<GameData> & Partial<PageData> & {
	isLimitReached: boolean,
	numberOfPages: number,
	take: number,
	skips: Array<number>,
	setGameData: (gameData: Partial<GameData> & Pick<PageData, 'isLimitReached'>) => void,
	setPageData: (gameData: Partial<PageData>) => void,
	setIsLimitReached: (isLimitReached: boolean) => void,
}

export const usePopularGamesStore = create(devtools<PopularGamesState>((set) => ({
	games: undefined,
	after: undefined,
	before: undefined,
	isLimitReached: false,
	numberOfPages: 1,
	take: 50,
	skips: [0],
	setGameData: (gameData) => set(gameData, false, 'setGameData'),
	setPageData: (pageData) => set(pageData, false, 'setPageData'),
	setIsLimitReached: (isLimitReached) => set({ isLimitReached }, false, 'setIsLimitReached'),
}), { name: 'usePopularGamesStore' }))

export const usePopularGames = (newSkip = 0) => {
	const { data } = useSWR<{ games: Array<GameSimple>, skip: number, take: number, before: GameSimple | null, after: GameSimple | null }>(
		['/games', newSkip],
		([link, skip]: [string, number]) => fetcher(`${link}?is-popular=yes${skip ? `&skip=${skip}` : ''}`),
		{ revalidateOnFocus: false },
	)

	const setGameData = usePopularGamesStore((state) => state.setGameData)

	const { setIsLoading } = useLoading()
	useEffect(() => {
		setGameData({
			games: data?.games,
			after: data?.after,
			before: data?.before,
			isLimitReached: data?.after === null,
		})
		setIsLoading(Boolean(!data))
	}, [data, setGameData])

	return {
		games: usePopularGamesStore((state) => state.games),
		after: usePopularGamesStore((state) => state.after),
		setIsLimitReached: usePopularGamesStore((state) => state.setIsLimitReached),
	}
}
