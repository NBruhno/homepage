import { lastDayOfYear, isSameDay, parseISO } from 'date-fns'

export const dateOrYear = (dateIsoString?: string | null) => {
	// FIXME: Set a high date for unknown, since it's currently not possible to sort null last with Prisma
	if (!dateIsoString || dateIsoString === '9999-12-31T00:00:00.000Z') return 'TBA'
	const date = parseISO(dateIsoString)
	if (isSameDay(lastDayOfYear(date), date)) {
		return `TBA ${date.toLocaleString('en-DK', { year: 'numeric' })}`
	}
	return date.toLocaleString('en-DK', { year: 'numeric', month: 'long', day: 'numeric' })
}
