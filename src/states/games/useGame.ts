import type { Game, GamePrice } from 'types'

import { useState, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher, Method } from 'lib/fetcher'

import type { ApiError } from 'api/errors'

export const useGame = (id: string) => {
	const [user] = useGlobalState('user')
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(undefined)
	const { data: game, error } = useSWR<Game, ApiError>(id ? `/games/${id}` : null, (link: string) => fetcher(link), { revalidateOnFocus: false })
	const { data: followingData } = useSWR<{ isFollowing: boolean }>((id && user.accessToken)
		? `/games/${id}/follows`
		: null, (link: string) => fetcher(link, { accessToken: user.accessToken }), { revalidateOnFocus: false })

	const follow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken: user.accessToken, method: Method.Post, body: { isFollowing: true } })

		if (response.message) setIsFollowing(true)
	}

	const canGetPrices = useMemo(() => id && game?.name && !error, [id, game?.name, error])
	const { data: prices } = useSWR<{ prices: Array<GamePrice> }>((canGetPrices && game?.name)
		? `/games/${id}/prices?name=${encodeURIComponent(game.name)}`
		: null, (link: string) => fetcher(link), { revalidateOnFocus: false })

	const unfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken: user.accessToken, method: Method.Post, body: { isFollowing: false } })
		if (response.message) setIsFollowing(false)
	}
	useEffect(() => setIsFollowing(followingData?.isFollowing), [followingData?.isFollowing])

	return { game, isFollowing, ...prices, follow: async () => follow(), unfollow: async () => unfollow() }
}
