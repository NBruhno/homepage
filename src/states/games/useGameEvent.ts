import type { GameEvent } from 'types'

import useSwr from 'swr'

import { useLoading } from 'states/page'

type Props = {
	id: number | null
}

export const useGameEvent = ({ id }: Props) => {
	const { data: event, isLoading: isGameLoading } = useSwr<GameEvent | undefined>(id ? `/game-events/${id}` : null)
	const { isLoading } = useLoading(isGameLoading && Boolean(!event))

	return { event, isLoading }
}
