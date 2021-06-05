import type { Game, Price } from 'types/Games'

import { useState, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher, Method } from 'lib/fetcher'

import type { ApiError } from 'containers/api/errors/ApiError'

export const useGame = (id: string) => {
	const [user] = useGlobalState('user')
	const [following, setFollowing] = useState<boolean | undefined>(undefined)
	const { data: game, error } = useSWR<Game, ApiError>(id ? `/games/${id}` : null, (link) => fetcher(link), { revalidateOnFocus: false })
	const { data: followingData } = useSWR<{ following: boolean }>((id && user?.accessToken)
		? `/games/${id}/follows`
		: null, (link) => fetcher(link, { accessToken: user?.accessToken }), { revalidateOnFocus: false })

	const follow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken: user.accessToken, method: Method.Post })

		if (response.message) setFollowing(true)
	}

	const canGetPrices = useMemo(() => id && game?.name && !error, [id, game?.name, error])
	const { data: prices } = useSWR<{ prices: Array<Price> }>(canGetPrices
		? `/games/${id}/prices?name=${game?.name}`
		: null, (link) => fetcher(link), { revalidateOnFocus: false })

	const unfollow = async () => {
		const response = await fetcher<{ message?: string }>(`/games/${id}/follows`, { accessToken: user.accessToken, method: Method.Patch })
		if (response.message) setFollowing(false)
	}
	useEffect(() => setFollowing(followingData?.following), [followingData?.following])

	return { game, following, ...prices, follow: async () => follow(), unfollow: async () => unfollow() }
}
