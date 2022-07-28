import { string, define, is } from 'superstruct'

export const email = (errorMessage = 'Has to be a valid email') => define<string>('email', (value) => {
	if (is(value, string()) && /^[^\s@]+@([^\s@.,]+\.)+[a-z]{2,}$/.exec(value)) {
		return true
	} else return errorMessage
})
