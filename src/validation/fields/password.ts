import type { DefaultProps, DefaultFields } from './DefaultProps'
import type { Struct } from 'superstruct'

import { define, is, optional } from 'superstruct'

import { password } from 'validation/shared'

type Return<T> = T extends true ? Struct<string | undefined, null> : T extends false ? Struct<string, null> : never

export const requiredPassword = <T = false>({ requiredErrorMessage, invalidErrorMessage }: DefaultFields) => (
	define<string>('fieldPassword', (value) => {
		const isValidPassword = is(value, optional(password()))
		if (!isValidPassword) return invalidErrorMessage
		if (is(value, password())) return true
		return requiredErrorMessage
	}) as Return<T>
)

export const optionalPassword = <T = false>({ invalidErrorMessage }: Pick<DefaultFields, 'invalidErrorMessage'>) => (
	define<string | undefined>('fieldPasswordOptional', (value) => (
		is(value, optional(password())) || invalidErrorMessage)) as Return<T>
)

export const fieldPassword = <T extends boolean = false>({
	requiredErrorMessage = 'This field is required',
	invalidErrorMessage = 'Has to between 14 and 64 characters long',
	isOptional,
}: DefaultProps<T> = {}): Return<T> => {
	if (isOptional) return optionalPassword<T>({ invalidErrorMessage })
	return requiredPassword<T>({ requiredErrorMessage, invalidErrorMessage })
}
