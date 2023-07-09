import type { GameInsights } from 'types'

import useSWR from 'swr'
import { shallow } from 'zustand/shallow'

import { useGameStore } from './useGame'

export const useGameInsights = () => {
	const { id, steamAppId, isGameLoading } = useGameStore((state) => ({ steamAppId: state.steamAppId, id: state.id, isGameLoading: state.isLoading }), shallow)
	const { data: insights, isLoading } = useSWR<GameInsights | undefined>(id && steamAppId
		? `/games/${id}/insights?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)

	return { insights, isLoading: isGameLoading || isLoading }
}
