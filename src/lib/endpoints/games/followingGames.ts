import type { GameSimple } from 'types'

import { fetcher } from 'lib/fetcher'

type Payload = {
	games: Array<GameSimple>,
	after: GameSimple | null,
	before: GameSimple | null,
	skip: number,
	take: number,
}

type Props = {
	userId: string,
	skip: number,
}

export const endpointFollowingGames = async ({ userId, skip = 0 }: Props) => {
	const payload = await fetcher<Payload>('/games', {
		query: {
			user: userId,
			skip: skip.toString(),
		},
	})

	return payload
}
