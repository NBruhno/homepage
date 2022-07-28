import type { GameData, PageData } from './types'
import type { ParsedUrlQuery } from 'querystring'

import { useEffect } from 'react'
import useSWR from 'swr'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { useLoading } from 'states/page'

import { fetcher } from 'lib/fetcher'

export type FollowingGamesState = PageData & Partial<GameData> & {
	setGameData: (gameData: Partial<GameData> & Pick<PageData, 'isLimitReached'>) => void,
	setPageData: (gameData: PageData) => void,
	setIsLimitReached: (isLimitReached: boolean) => void,
}

export const useFollowingGamesStore = create(devtools<FollowingGamesState>((set) => ({
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
}), { name: 'useFollowingGamesStore' }))

export const useFollowingGames = (query: ParsedUrlQuery, newSkip = 0) => {
	const { data } = useSWR<GameData & { skip: number, take: number }>(
		query.user
			? ['/games', query.user, newSkip]
			: null, ([link, followedGamesUser, skip]: [string, string, number]) => fetcher(`${link}?user=${followedGamesUser}${skip ? `&skip=${skip}` : ''}`), {
			revalidateOnFocus: false,
		},
	)

	const setGameData = useFollowingGamesStore((state) => state.setGameData)

	useLoading(Boolean(!data))
	useEffect(() => {
		setGameData({
			games: data?.games,
			after: data?.after,
			before: data?.before,
			isLimitReached: data?.after === null,
		})
	}, [data])

	return {
		games: useFollowingGamesStore((state) => state.games),
		after: useFollowingGamesStore((state) => state.after),
		setIsLimitReached: useFollowingGamesStore((state) => state.setIsLimitReached),
	}
}
