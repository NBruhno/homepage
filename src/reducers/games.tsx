import { useState } from 'react'
import useSWR from 'swr'

import { useStore } from 'lib/store'
import { fetcher, Method } from 'lib/fetcher'

export const useGames = () => {
	const [query, setQuery] = useState(undefined)
	const { state } = useStore()

	const { data, error } = useSWR(state.user.accessToken ? ['/games', query] : null, (link, query) => fetcher(link, { body: query, accessToken: state.user.accessToken, method: Method.Post }), { revalidateOnFocus: false })

	return { games: data, error, setQuery }
}

export const useGame = (id: string | Array<string>) => {
	const { state } = useStore()

	const { data, error } = useSWR(state.user.accessToken ? `/games/${id}` : null, (link) => fetcher(link, { accessToken: state.user.accessToken }), { revalidateOnFocus: false })

	return { game: data, error }
}
