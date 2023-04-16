import type { GameExtended, GameInsights, GameNews, GamePrice } from 'types'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

import { useLoading } from 'states/page'
import { useUser } from 'states/users'

import { fetcher, Method } from 'lib/fetcher'
import { getSteamAppId } from 'lib/getSteamAppId'

type Props = {
	id: string,
	initialGame?: GameExtended,
	initialPrices?: Array<GamePrice>,
}

type GameState = {
	id: number | undefined,
	steamAppId: string | null | undefined,

	resetGame: () => void,
	setGameIds: (id: number, steamAppId: string | null) => void,
}

const initialState = {
	id: undefined,
	steamAppId: undefined,
}

export const useGameStore = create<GameState>()(devtools((set) => ({
	...initialState,
	resetGame: () => set({ ...initialState }, false, 'resetGame'),
	setGameIds: (id, steamAppId) => set({ id, steamAppId }, false, 'setGameIds'),
}), { anonymousActionType: 'useGame' }))

export const useGame = ({ id, initialGame, initialPrices }: Props) => {
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(undefined)

	const accessToken = useUser((state) => state.accessToken)
	const { setGameIds, resetGame } = useGameStore((state) => state, shallow)

	const { data: game, isLoading: isGameLoading } = useSWR<GameExtended | undefined>(id ? `/games/${id}` : null, null, { fallbackData: initialGame })

	useEffect(() => {
		if (game) {
			setGameIds(game.id, getSteamAppId(game.websites))
		}

		return () => resetGame()
	}, [game])

	const { data: prices } = useSWR<Array<GamePrice> | undefined>(id && game?.name
		? `/games/${id}/prices?name=${encodeURIComponent(game.name)}`
		: null, null, { fallbackData: initialPrices ?? undefined })
	const { data: userData } = useSWR<{ isFollowing: boolean, isInSteamLibrary: boolean }>((id && accessToken)
		? `/games/${id}/user-status`
		: null, (link: string) => fetcher(link, { accessToken }))

	const steamAppId = getSteamAppId(game?.websites)
	const { data: news } = useSWR<GameNews | undefined>(id && steamAppId
		? `/games/${id}/news?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)
	const { data: insights } = useSWR<GameInsights | undefined>(id && steamAppId
		? `/games/${id}/insights?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)
	const { isLoading } = useLoading(isGameLoading && Boolean(!game) && Boolean(!initialGame))

	const onFollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken, method: Method.Post, body: { isFollowing: true } })
		if (response.message) setIsFollowing(true)
	}

	const onUnfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken, method: Method.Post, body: { isFollowing: false } })
		if (response.message) setIsFollowing(false)
	}

	useEffect(() => setIsFollowing(userData?.isFollowing), [userData?.isFollowing])

	return { game, prices, news: ((id && steamAppId) || isLoading) ? news : null, insights: ((id && steamAppId) || isLoading) ? insights : null, isFollowing, isInSteamLibrary: Boolean(userData?.isInSteamLibrary), onFollow, onUnfollow }
}
