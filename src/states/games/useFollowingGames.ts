import type { GameData } from './types'
import type { ParsedUrlQuery } from 'querystring'

import { useEffect } from 'react'
import useSWR from 'swr'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { useLoading } from 'states/page'

import { fetcher } from 'lib/fetcher'

export type FollowingGamesState = {
	isLimitReached: boolean,
	take: number,
	setIsLimitReached: (isLimitReached: boolean) => void,
}

export const useFollowingGamesStore = create<FollowingGamesState>()(devtools((set) => ({
	isLimitReached: false,
	take: 50,
	setIsLimitReached: (isLimitReached) => set({ isLimitReached }, false, 'setIsLimitReached'),
}), { anonymousActionType: 'useFollowingGamesStore' }))

export const useFollowingGames = (query: ParsedUrlQuery, newSkip = 0) => {
	const { data } = useSWR<GameData>(
		query.user
			? ['/games', query.user, newSkip]
			: null, ([link, followedGamesUser, skip]: [string, string, number]) => fetcher<GameData>(`${link}?user=${followedGamesUser}${skip ? `&skip=${skip}` : ''}`), {
			revalidateOnFocus: false,
		},
	)

	const setIsLimitReached = useFollowingGamesStore((state) => state.setIsLimitReached)
	const { setIsLoading } = useLoading()
	useEffect(() => {
		setIsLimitReached(data?.after === null)
		setIsLoading(Boolean(!data))
	}, [data, setIsLimitReached, setIsLoading])

	return {
		games: data?.games,
		after: data?.after,
		setIsLimitReached: useFollowingGamesStore((state) => state.setIsLimitReached),
	}
}
