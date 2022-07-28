import type { DefaultProps, DefaultFields } from './DefaultProps'
import type { Struct } from 'superstruct'

import { number, define, is, optional } from 'superstruct'

type Return<T> = T extends true ? Struct<number | undefined, null> : T extends false ? Struct<number, null> : never

export const requiredNumber = <T = false>({ requiredErrorMessage, invalidErrorMessage }: DefaultFields) => (
	define<number>('fieldNumber', (value) => {
		const isValidNumber = is(value, optional(number()))
		if (!isValidNumber) return invalidErrorMessage
		if (is(value, number())) return true
		return requiredErrorMessage
	}) as Return<T>
)

export const optionalNumber = <T = false>({ invalidErrorMessage }: Pick<DefaultFields, 'invalidErrorMessage'>) => (
	define<number | undefined>('fieldNumberOptional', (value) => (
		is(value, optional(number())) || invalidErrorMessage)) as Return<T>
)

export const fieldNumber = <T extends boolean = false>({
	requiredErrorMessage = 'This field is required',
	invalidErrorMessage = 'Has to be a number',
	isOptional,
}: DefaultProps<T> = {}): Return<T> => {
	if (isOptional) return optionalNumber<T>({ invalidErrorMessage })
	return requiredNumber<T>({ requiredErrorMessage, invalidErrorMessage })
}
