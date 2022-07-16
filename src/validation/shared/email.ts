import { string, define, is } from 'superstruct'

export const email = () => define<string>('email', (value) => {
	if (is(value, string()) && /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.exec(value)) {
		return true
	} else return 'Has to be a valid email'
})
