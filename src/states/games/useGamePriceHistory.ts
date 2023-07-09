import type { GamePriceHistory } from 'types'

import useSWR from 'swr'
import { shallow } from 'zustand/shallow'

import { useGameStore } from './useGame'

export const useGamePriceHistory = () => {
	const { id, name, isGameLoading } = useGameStore((state) => ({ id: state.id, name: state.name, isGameLoading: state.isLoading }), shallow)
	const { data: priceHistory, isLoading } = useSWR<GamePriceHistory>(id && name
		? `/games/${id}/price-history?name=${encodeURIComponent(name)}`
		: null, null)

	return { priceHistory, isLoading: isGameLoading || isLoading }
}
