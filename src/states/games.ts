import { useState, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import type { Game, SimpleGame, ListTypes, Price } from 'types/Games'

import { useAuth } from 'states/auth'

import { fetcher, Method } from 'lib/fetcher'

import { useGlobalState } from './globalState'

export const useGames = () => {
	const [{ games: gamesSearch }] = useGlobalState('forms')
	const [gamesState, setGameState] = useGlobalState('games')
	const { user } = useAuth()
	const { data: popular } = useSWR<{ games: Array<SimpleGame> }>(user?.isStateKnown
		? ['/games']
		: null, (link) => fetcher(link), { revalidateOnFocus: false })

	const { data: following } = useSWR<{ games: Array<SimpleGame> }>(user?.accessToken
		? ['/games?following=true', user.accessToken]
		: null, (link, accessToken) => fetcher(link, { accessToken }), { revalidateOnFocus: false })

	const { data: search } = useSWR<{ games: Array<SimpleGame> }>(gamesSearch?.search
		? ['/games?search=', gamesSearch?.search]
		: null, (link, searchParameter) => fetcher(`${link}${searchParameter}`), { revalidateOnFocus: false })

	const setCurrentList = (currentList: ListTypes) => {
		if (currentList !== gamesState.currentList) {
			setGameState({ ...gamesState, currentList })
		}
	}

	const games = {
		popular: popular?.games,
		following: following?.games,
		games: search?.games,
	}

	return { ...games, currentList: gamesState.currentList, gamesSearch, setCurrentList }
}

export const useGame = (id: string) => {
	const { user } = useAuth()
	const [following, setFollowing] = useState<boolean>(undefined)
	const { data: game, error } = useSWR<Game>(id ? `/games/${id}` : null, (link) => fetcher(link), { revalidateOnFocus: false })
	const { data: followingData } = useSWR<{ following: boolean }>((id && user?.accessToken)
		? `/games/${id}/follow`
		: null, (link) => fetcher(link, { accessToken: user?.accessToken }), { revalidateOnFocus: false })

	const follow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follow`, { accessToken: user.accessToken, method: Method.Post })

		if (response.message) setFollowing(true)
	}

	const canGetPrices = useMemo(() => id && game?.name && !error, [id, game?.name, error])
	const { data: prices } = useSWR<{ prices: Array<Price> }>(canGetPrices
		? `/games/${id}/prices?name=${game.name}`
		: null, (link) => fetcher(link), { revalidateOnFocus: false })

	const unfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/unfollow`, { accessToken: user.accessToken, method: Method.Patch })
		if (response.message) setFollowing(false)
	}
	useEffect(() => setFollowing(followingData?.following), [followingData?.following])

	return { game, following, ...prices, follow: async () => follow(), unfollow: async () => unfollow() }
}
