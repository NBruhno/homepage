import { lastDayOfYear, isSameDay, parseISO } from 'date-fns'

export const dateOrYear = (dateIsoString?: string | null) => {
	if (dateIsoString === null || dateIsoString === undefined) return 'TBA'
	const date = parseISO(dateIsoString)
	if (isSameDay(lastDayOfYear(date), date)) {
		return `TBA ${date.toLocaleString('en-DK', { year: 'numeric' })}`
	}
	return date.toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })
}
