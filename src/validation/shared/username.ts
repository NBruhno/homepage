import { string, define, is, size } from 'superstruct'

export const username = (errorMessage = 'Has to be between 2-64 characters long') => define<string>('username', (value) => {
	if (is(value, size(string(), 2, 64))) return true
	else return errorMessage
})
