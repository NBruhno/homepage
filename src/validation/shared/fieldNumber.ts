import { number, define, is } from 'superstruct'

export const fieldNumber = (errorMessage = 'This field is required') => define<number>('fieldNumber', (value) => {
	if (is(value, number())) return true
	else return errorMessage
})
