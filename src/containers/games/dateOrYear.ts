import { lastDayOfYear, isSameDay, fromUnixTime } from 'date-fns'

export const dateOrYear = (timestamp: number) => {
	if (!timestamp) return 'TBA'
	const date = new Date(fromUnixTime(timestamp))
	if (isSameDay(lastDayOfYear(date), date)) {
		return `TBA ${date.toLocaleString('en-DK', { year: 'numeric' })}`
	}
	return date.toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })
}
