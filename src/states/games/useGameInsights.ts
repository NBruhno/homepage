import type { GameInsights } from 'types'

import useSwr from 'swr'

import { useGameStore } from './useGame'

export const useGameInsights = () => {
	const { id, steamAppId, isGameLoading } = useGameStore((state) => ({
		steamAppId: state.steamAppId,
		id: state.id,
		isGameLoading: state.isLoading,
	}))
	const { data: insights, isLoading } = useSwr<GameInsights | undefined>(
		id && steamAppId ? `/games/${id}/insights?steam-app-id=${encodeURIComponent(steamAppId)}` : null,
		null,
	)

	return { insights, isLoading: isGameLoading || isLoading }
}
