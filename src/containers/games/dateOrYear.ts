import { lastDayOfYear, isSameDay } from 'date-fns'

export const dateOrYear = (date: number | Date) => {
	if (!date) return 'TBA'
	if (isSameDay(lastDayOfYear(date), new Date(date))) {
		return `TBA ${new Date(date).toLocaleString('en-DK', { year: 'numeric' })}`
	}
	return new Date(date).toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })
}
