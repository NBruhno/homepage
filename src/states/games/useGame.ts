import type { Game } from 'types'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

import { useGlobalState } from 'states/global'
import { useLoading } from 'states/isLoading'

import { fetcher, Method } from 'lib/fetcher'

export const useGame = (id: string, game?: Game) => {
	const [user] = useGlobalState('user')
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(undefined)
	const { data: followingData } = useSWR<{ isFollowing: boolean }>((id && user.accessToken)
		? `/games/${id}/follows`
		: null, (link: string) => fetcher(link, { accessToken: user.accessToken }), { revalidateOnFocus: false })
	useLoading(Boolean(!game))

	const follow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken: user.accessToken, method: Method.Post, body: { isFollowing: true } })

		if (response.message) setIsFollowing(true)
	}

	const unfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken: user.accessToken, method: Method.Post, body: { isFollowing: false } })
		if (response.message) setIsFollowing(false)
	}
	useEffect(() => setIsFollowing(followingData?.isFollowing), [followingData?.isFollowing])

	return { game, isFollowing, follow: async () => follow(), unfollow: async () => unfollow() }
}
