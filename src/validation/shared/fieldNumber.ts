import { number, define, is } from 'superstruct'

export const fieldNumber = () => define<number>('fieldNumber', (value) => {
	if (is(value, number())) return true
	else return 'This field is required'
})
