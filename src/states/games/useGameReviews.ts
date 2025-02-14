import type { GameInsights } from 'types'

import useSwr from 'swr'

type Props = {
	id: string
	steamAppId: string
}

export const useGameReviews = ({ id, steamAppId }: Props) => {
	const { data: insights, isLoading } = useSwr<GameInsights | undefined>(
		id && steamAppId ? `/games/${id}/insights?steam-app-id=${encodeURIComponent(steamAppId)}` : null,
		null,
	)

	return { insights, isLoading }
}
