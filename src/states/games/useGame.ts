import type { GameExtended } from 'types'

import { useEffect } from 'react'
import useSWR from 'swr'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

import { useLoading } from 'states/page'

import { getSteamAppId } from 'lib/getSteamAppId'

type Props = {
	id: number | null,
	initialGame?: GameExtended,
}

type GameState = {
	id: number | undefined,
	name: string | undefined,
	steamAppId: string | null | undefined,
	isLoading: boolean,

	resetGame: () => void,
	setGameName: (name: string) => void,
	setGameIds: (id: number, steamAppId: string | null) => void,
	setGameIsLoading: (isLoading: boolean) => void,
}

const initialState = {
	id: undefined,
	name: undefined,
	steamAppId: undefined,
	isLoading: true,
}

export const useGameStore = create<GameState>()(devtools((set) => ({
	...initialState,
	resetGame: () => set({ ...initialState }, false, 'resetGame'),
	setGameName: (name) => set({ name }, false, 'setGame'),
	setGameIds: (id, steamAppId) => set({ id, steamAppId }, false, 'setGameIds'),
	setGameIsLoading: (isLoading) => set({ isLoading }, false, 'setGameIsLoading'),
}), { anonymousActionType: 'useGame' }))

export const useGame = ({ id, initialGame }: Props) => {
	const { setGameIds, setGameName, setGameIsLoading, resetGame } = useGameStore((state) => state, shallow)

	const { data: game, isLoading: isGameLoading } = useSWR<GameExtended | undefined>(id ? `/games/${id}` : null, null, { fallbackData: initialGame })

	useEffect(() => {
		if (game) {
			setGameName(game.name)
			setGameIds(game.id, getSteamAppId(game.websites))
		}

		return () => resetGame()
	}, [game])

	useEffect(() => {
		setGameIsLoading(isGameLoading)
		return () => resetGame()
	}, [isGameLoading])

	const steamAppId = getSteamAppId(game?.websites)
	const { isLoading } = useLoading(isGameLoading && Boolean(!game) && Boolean(!initialGame))

	return { game, isLoading, steamAppId }
}
