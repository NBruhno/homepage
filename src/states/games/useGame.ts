import type { GameExtended, GamePrice } from 'types'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { useLoading } from 'states/page'
import { useUser } from 'states/users'

import { fetcher, Method } from 'lib/fetcher'

type Props = {
	id: string,
	initialGame?: GameExtended,
	initialPrices?: Array<GamePrice>,
}

export const useGame = ({ id, initialGame, initialPrices }: Props) => {
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(undefined)
	const accessToken = useUser((state) => state.accessToken)

	const { data: game } = useSWR(id ? `/games/${id}` : null, null, { fallbackData: initialGame })
	const { data: gamePricing } = useSWR<{ prices: Array<GamePrice> }>(id && game?.name
		? `/games/${id}/prices?name=${encodeURIComponent(game.name)}`
		: null, null, { fallbackData: initialPrices ? { prices: initialPrices } : undefined })
	const { data: followingData } = useSWR<{ isFollowing: boolean }>((id && accessToken)
		? `/games/${id}/follows`
		: null, (link: string) => fetcher(link, { accessToken }))
	useLoading(Boolean(!game) && Boolean(!initialGame))

	const onFollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken, method: Method.Post, body: { isFollowing: true } })
		if (response.message) setIsFollowing(true)
	}

	const onUnfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken, method: Method.Post, body: { isFollowing: false } })
		if (response.message) setIsFollowing(false)
	}

	useEffect(() => setIsFollowing(followingData?.isFollowing), [followingData?.isFollowing])

	return { game, prices: gamePricing?.prices, isFollowing, onFollow, onUnfollow }
}
