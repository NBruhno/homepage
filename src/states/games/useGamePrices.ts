import type { GamePrice } from 'types'

import useSWR from 'swr'
import { shallow } from 'zustand/shallow'

import { useGameStore } from './useGame'

export const useGamePrices = () => {
	const { id, name, isGameLoading } = useGameStore((state) => ({ id: state.id, name: state.name, isGameLoading: state.isLoading }), shallow)
	const { data: prices, isLoading } = useSWR<Array<GamePrice> | undefined>(id && name
		? `/games/${id}/prices?name=${encodeURIComponent(name)}`
		: null, null)

	return { prices, isLoading: isGameLoading || isLoading }
}
