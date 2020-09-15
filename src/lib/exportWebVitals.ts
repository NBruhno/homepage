import { logger } from './logger'

export type Metric = {
	id: string,
	name: string,
	startTime: number,
	value: number,
	label: 'web-vital' | 'custom',
}

export const reportWebVitals = (metric: Metric) => {
	logger.debug(metric)
}
