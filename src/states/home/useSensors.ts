import type { Sensor } from 'types'

import useSWR from 'swr'

import { useUser } from 'states/users'

import type { ApiError } from 'lib/errors'
import { fetcher } from 'lib/fetcher'

export const useSensors = () => {
	const accessToken = useUser((state) => state.accessToken)

	const { data } = useSWR<{ sensors: Array<Sensor> }, ApiError>(
		accessToken ? '/home/sensors' : null, (link: string) => (
			fetcher(link, { accessToken })
		), {
			refreshInterval: 60000,
			errorRetryInterval: 10000,
			revalidateOnFocus: false,
		},
	)

	return { sensors: data?.sensors }
}
