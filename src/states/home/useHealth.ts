import { differenceInSeconds, formatDuration, subSeconds, intervalToDuration } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import { useGlobalState } from 'states/global'

import { fetcher } from 'lib/fetcher'

import type { ApiError } from 'api/errors'

type Health = {
	message: string,
	responseTime: number,
	status: 'Healthy' | 'Unhealthy',
	systemStatus: {
		/** Uptime in seconds */
		uptime: number,
		cpu: {
			count: number,
			usage: string,
			loadAverages: {
				lastMinute: number,
				lastFiveMinutes: number,
				lastFifteenMinutes: number,
			},
		},
		memory: {
			total: string,
			used: string,
			free: string,
		},
	},
}

type Return = {
	health: Health | undefined,
	status: 'Healthy' | 'Unhealthy' | 'Unresponsive',
	lastTimeFetched: Date,
	secondsSinceLastFetch: number,
	uptime: string,
}

export const useHealth = (): Return => {
	const [user] = useGlobalState('user')
	const [lastTimeFetched, setLastTimeFetched] = useState(new Date())
	const [secondsSinceLastFetch, setSecondsSinceLastFetch] = useState(differenceInSeconds(new Date(), lastTimeFetched))

	useEffect(() => {
		const interval = setInterval(() => {
			const differenceInSecondsSinceLastFetch = differenceInSeconds(new Date(), lastTimeFetched)
			if (differenceInSecondsSinceLastFetch !== secondsSinceLastFetch) setSecondsSinceLastFetch(differenceInSecondsSinceLastFetch)
		}, 100)
		return () => clearInterval(interval)
	})

	const { data: health, error } = useSWR<Health, ApiError>(
		user.accessToken ? '/home/health' : null, (link: string) => (
			fetcher(link, { accessToken: user.accessToken })
		), {
			refreshInterval: 10000,
			errorRetryInterval: 10000,
			revalidateOnFocus: false,
			onSuccess: () => {
				setLastTimeFetched(new Date())
			},
			onError: () => {
				setLastTimeFetched(new Date())
			},
		},
	)

	const uptime = useMemo(() => {
		const bootDate = subSeconds(new Date(), health?.systemStatus.uptime ?? 0)
		const duration = intervalToDuration({
			start: bootDate,
			end: new Date(),
		})
		return formatDuration(duration, { delimiter: ', ', format: ['years', 'months', 'weeks', 'days', 'hours', 'minutes'] })
	}, [health?.systemStatus.uptime])

	const status = error ? 'Unresponsive' : health?.status ?? 'Unresponsive'

	return { health, status, lastTimeFetched, secondsSinceLastFetch, uptime }
}