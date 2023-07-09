import type { GameInsights } from 'types'

import useSWR from 'swr'

type Props = {
	id: string,
	steamAppId: string,
}

export const useGameReviews = ({ id, steamAppId }: Props) => {
	const { data: insights, isLoading } = useSWR<GameInsights | undefined>(id && steamAppId
		? `/games/${id}/insights?steam-app-id=${encodeURIComponent(steamAppId)}`
		: null, null)

	return { insights, isLoading }
}
