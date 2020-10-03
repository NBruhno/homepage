import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { useAuth } from 'states/auth'

import type { Game, SimpleGame, ListTypes } from 'types/Games'

import { fetcher, Method } from 'lib/fetcher'
import { useGlobalState } from './globalState'

export const useGames = () => {
	const [forms] = useGlobalState('forms')
	const [gamesState, setGameState] = useGlobalState('games')
	const { user } = useAuth()
	const { data: popular } = useSWR<{ popular: Array<SimpleGame> }>(user?.isStateKnown
		? ['/games']
		: null, (link) => fetcher(link), { revalidateOnFocus: false })

	const { data: following } = useSWR<{ following: Array<SimpleGame> }>(user?.accessToken
		? ['/games?following=true', user.accessToken]
		: null, (link, accessToken) => fetcher(link, { accessToken }), { revalidateOnFocus: false })

	const { data: search } = useSWR<{ popular: Array<SimpleGame> }>(forms.games?.search
		? ['/games?search=', forms.games?.search]
		: null, (link, searchParameter) => fetcher(`${link}${searchParameter}`), { revalidateOnFocus: false })

	const setCurrentList = (currentList: ListTypes) => {
		if (currentList !== gamesState.currentList) {
			setGameState({ ...gamesState, currentList })
		}
	}

	const games = {
		...popular,
		...following,
		games: search?.popular,
	}

	return { ...games, currentList: gamesState.currentList, setCurrentList }
}

export const useGame = (id: string) => {
	const { user } = useAuth()
	const [following, setFollowing] = useState<boolean>(undefined)
	const { data: game } = useSWR<Game>(id ? `/games/${id}` : null, (link) => fetcher(link), { revalidateOnFocus: false })
	const { data: followingData } = useSWR<{ following: boolean }>((id && user?.accessToken)
		? `/games/${id}/follow`
		: null, (link) => fetcher(link, { accessToken: user?.accessToken }), { revalidateOnFocus: false })

	const follow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follow`, { accessToken: user.accessToken, method: Method.Post })

		if (response.message) setFollowing(true)
	}

	const unfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/unfollow`, { accessToken: user.accessToken, method: Method.Patch })
		if (response.message) setFollowing(false)
	}
	useEffect(() => setFollowing(followingData?.following), [followingData?.following])

	return { game, following, follow: async () => follow(), unfollow: async () => unfollow() }
}
