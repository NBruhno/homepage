import { string, define, is } from 'superstruct'

export const fieldString = () => define<string>('fieldString', (value) => {
	if (is(value, string())) return true
	else return 'This field is required'
})
