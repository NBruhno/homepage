import { string, define, is, size } from 'superstruct'

export const uuid = (errorMessage = 'Has to be a valid UUID') => define<string>('uuid', (value) => {
	if (is(value, string()) && is(value, size(string(), 36)) && /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.exec(value)) {
		return true
	} else return errorMessage
})
