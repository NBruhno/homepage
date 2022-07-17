import { string, define, is } from 'superstruct'

export const fieldString = (errorMessage = 'This field is required') => define<string>('fieldString', (value) => {
	if (is(value, string())) return true
	else return errorMessage
})
