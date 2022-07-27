import type { DefaultProps, DefaultFields } from './DefaultProps'
import type { Struct } from 'superstruct'

import { string, define, is, optional } from 'superstruct'

type Return<T> = T extends true ? Struct<string | undefined, null> : Struct<string, null>

export const requiredString = <T = false>({ requiredErrorMessage, invalidErrorMessage }: DefaultFields) => (
	define<string>('fieldString', (value) => {
		const isValidString = is(value, optional(string()))
		if (!isValidString) return invalidErrorMessage
		if (is(value, string())) return true
		return requiredErrorMessage
	}) as Return<T>
)

export const optionalString = <T = false>({ invalidErrorMessage }: Pick<DefaultFields, 'invalidErrorMessage'>) => (
	define<string | undefined>('fieldStringOptional', (value) => (
		is(value, optional(string())) || invalidErrorMessage)) as Return<T>
)

export const fieldString = <T extends boolean = false>({
	requiredErrorMessage = 'This field is required',
	invalidErrorMessage = 'Has to be a string',
	isOptional,
}: DefaultProps<T> = {}): Return<T> => {
	if (isOptional) return optionalString<T>({ invalidErrorMessage })
	return requiredString<T>({ requiredErrorMessage, invalidErrorMessage })
}
