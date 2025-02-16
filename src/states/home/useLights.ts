import type { LightCollection } from 'types'

import useSwr from 'swr'
import useSwrMutation from 'swr/mutation'

import { useUser } from 'states/users'

import type { ApiError } from 'lib/errors'
import { Method, fetcher } from 'lib/fetcher'

type ToggleLight = {
	entityId: string
}

type AdjustLight = {
	entityId: string
	isTurnedOn?: boolean
	color?: [red: number, blue: number, green: number]
	brightness?: number
}

type DependencyKeys = [url: string, accessToken: string]

export const useLights = () => {
	const accessToken = useUser((state) => state.accessToken)

	const { data } = useSwr<LightCollection | undefined, ApiError>(
		accessToken ? ['/home/lights', accessToken] : null,
		([url, accessToken]: DependencyKeys) => fetcher<LightCollection>(url, { accessToken }),
		{
			refreshInterval: 30000,
			errorRetryInterval: 10000,
			revalidateOnFocus: false,
		},
	)

	const toggleLight = async ([url, accessToken]: DependencyKeys, { arg }: { arg: ToggleLight }) =>
		fetcher(`${url}/${arg.entityId}/toggle`, { accessToken, method: Method.Post })
	const { trigger: onToggleLight } = useSwrMutation(accessToken ? ['/home/lights', accessToken] : null, toggleLight)
	const adjustLight = async (
		[url, accessToken]: DependencyKeys,
		{ arg: { entityId, isTurnedOn, color, brightness } }: { arg: AdjustLight },
	) =>
		fetcher(`${url}/${entityId}`, {
			accessToken,
			method: Method.Patch,
			body: {
				isTurnedOn,
				color,
				brightness,
			},
		})
	const { trigger: onAdjustLight } = useSwrMutation(accessToken ? ['/home/lights', accessToken] : null, adjustLight)

	return { lights: data?.lights, rooms: data?.rooms, onToggleLight, onAdjustLight }
}
