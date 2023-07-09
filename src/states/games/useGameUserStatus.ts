import { type GameUserData } from 'types'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { shallow } from 'zustand/shallow'

import { useUser } from 'states/users'

import { Method, fetcher } from 'lib/fetcher'

import { useGameStore } from './useGame'

type DependencyKeys = [url: string, id: number, accessToken: string]

type ToggleFollow = {
	isFollowing: boolean,
}

export const useGameUserStatus = () => {
	const { id } = useGameStore((state) => ({ steamAppId: state.steamAppId, id: state.id, isGameLoading: state.isLoading }), shallow)
	const accessToken = useUser((state) => state.accessToken)

	const { data: userStatus, isLoading } = useSWR((id && accessToken)
		? [`/games/${id}/user-status`, id, accessToken]
		: null, ([link,, accessToken]) => fetcher<GameUserData>(link, { accessToken }))

	const toggleFollow = async ([, id, accessToken]: DependencyKeys, { arg }: { arg: ToggleFollow }) => fetcher(`/games/${id}/follows`, { accessToken, method: Method.Post, body: { isFollowing: arg.isFollowing } })

	const { trigger: onToggleFollowing } = useSWRMutation((accessToken && id) ? [`/games/${id}/user-status`, id, accessToken] : null, toggleFollow)

	return { userStatus, onToggleFollowing, isLoading }
}
