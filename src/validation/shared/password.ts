import { string, define, is } from 'superstruct'

export const password = () => define<string>('password', (value) => {
	if (is(value, string()) && /^\S{14,64}$/.exec(value)) return true
	else return 'Has to be between 14-64 characters long'
})
