import type { GamePrice } from 'types'

import useSwr from 'swr'

import { useGameStore } from './useGame'

export const useGamePrices = () => {
	const { id, name, steamAppId, isGameLoading } = useGameStore((state) => ({
		id: state.id,
		name: state.name,
		steamAppId: state.steamAppId,
		isGameLoading: state.isLoading,
	}))
	const { data: prices, isLoading } = useSwr<Array<GamePrice> | undefined>(
		id && name ? `/games/${id}/prices?name=${encodeURIComponent(name)}&steam-app-id=${steamAppId}` : null,
		null,
	)

	return { prices, isLoading: isGameLoading || isLoading }
}
