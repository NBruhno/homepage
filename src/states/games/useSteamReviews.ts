import type { GameReviews } from 'types'

import useSWR from 'swr'

import { useGameStore } from './useGame'

export const useSteamReviews = () => {
	const { id, steamAppId } = useGameStore((state) => state)
	const { data: reviews, isLoading } = useSWR<GameReviews | undefined>(id && steamAppId
		? `/games/${id}/reviews?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null)

	return {
		reviews: reviews!,
		isLoading: isLoading || Boolean(!reviews),
		hasReviews: steamAppId !== null && (isLoading || reviews?.steam.total.total),
	}
}
