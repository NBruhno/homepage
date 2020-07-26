export type Metric = {
	id: string,
	name: string,
	startTime: number,
	value: number,
	label: 'web-vital' | 'custom',
}

export const reportWebVitals = (metric: Metric) => {
	// eslint-disable-next-line no-console
	console.debug(metric)
}
