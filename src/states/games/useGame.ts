import type { GameExtended, GameInsights, GameNews, GamePrice, GameReviews } from 'types'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { useLoading } from 'states/page'
import { useUser } from 'states/users'

import { fetcher, Method } from 'lib/fetcher'
import { getSteamAppId } from 'lib/getSteamAppId'

type Props = {
	id: string,
	initialGame?: GameExtended,
	initialPrices?: Array<GamePrice>,
}

export const useGame = ({ id, initialGame, initialPrices }: Props) => {
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(undefined)
	const accessToken = useUser((state) => state.accessToken)

	const { data: game } = useSWR<GameExtended>(id ? `/games/${id}` : null, null, { fallbackData: initialGame })
	const { data: prices } = useSWR<Array<GamePrice>>(id && game?.name
		? `/games/${id}/prices?name=${encodeURIComponent(game.name)}`
		: null, null, { fallbackData: initialPrices ?? undefined })
	const { data: userData } = useSWR<{ isFollowing: boolean, isInSteamLibrary: boolean }>((id && accessToken)
		? `/games/${id}/user-status`
		: null, (link: string) => fetcher(link, { accessToken }))

	const steamAppId = getSteamAppId(game?.websites)
	const { data: news } = useSWR<GameNews>(id && steamAppId
		? `/games/${id}/news?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)
	const { data: reviews } = useSWR<GameReviews>(id && steamAppId
		? `/games/${id}/reviews?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)
	const { data: insights } = useSWR<GameInsights>(id && steamAppId
		? `/games/${id}/insights?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)
	const { isLoading } = useLoading(Boolean(!game) && Boolean(!initialGame))

	const onFollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken, method: Method.Post, body: { isFollowing: true } })
		if (response.message) setIsFollowing(true)
	}

	const onUnfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken, method: Method.Post, body: { isFollowing: false } })
		if (response.message) setIsFollowing(false)
	}

	useEffect(() => setIsFollowing(userData?.isFollowing), [userData?.isFollowing])

	return { game, prices, news: ((id && steamAppId) || isLoading) ? news : null, reviews: ((id && steamAppId) || isLoading) ? reviews : null, insights: ((id && steamAppId) || isLoading) ? insights : null, isFollowing, isInSteamLibrary: Boolean(userData?.isInSteamLibrary), onFollow, onUnfollow }
}
