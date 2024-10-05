import type { GameNews } from 'types'

import useSWR from 'swr'

import { useGameStore } from './useGame'

export const useGameNews = () => {
	const { id, steamAppId, isGameLoading } = useGameStore((state) => ({ steamAppId: state.steamAppId, id: state.id, isGameLoading: state.isLoading }))
	const { data: news, isLoading } = useSWR<GameNews | undefined>(id && steamAppId
		? `/games/${id}/news?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)

	return { news, isLoading: isGameLoading || isLoading }
}
