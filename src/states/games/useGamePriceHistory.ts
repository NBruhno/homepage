import type { GamePriceHistory } from 'types'

import useSwr from 'swr'

import { useGameStore } from './useGame'

export const useGamePriceHistory = () => {
	const { id, name, isGameLoading } = useGameStore((state) => ({
		id: state.id,
		name: state.name,
		isGameLoading: state.isLoading,
	}))
	const { data: priceHistory, isLoading } = useSwr<GamePriceHistory>(
		id && name ? `/games/${id}/price-history?name=${encodeURIComponent(name)}` : null,
		null,
	)

	return { priceHistory, isLoading: isGameLoading || isLoading }
}
