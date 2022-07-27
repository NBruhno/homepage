import type { DefaultProps, DefaultFields } from './DefaultProps'
import type { Struct } from 'superstruct'

import { define, is, optional } from 'superstruct'

import { email } from 'validation/shared'

type Return<T> = T extends true ? Struct<string | undefined, null> : T extends false ? Struct<string, null> : never

export const requiredEmail = <T = false>({ requiredErrorMessage, invalidErrorMessage }: DefaultFields) => (
	define<string>('fieldEmail', (value) => {
		const isValidEmail = is(value, optional(email()))
		if (!isValidEmail) return invalidErrorMessage
		if (is(value, email())) return true
		return requiredErrorMessage
	}) as Return<T>
)

export const optionalEmail = <T = false>({ invalidErrorMessage }: Pick<DefaultFields, 'invalidErrorMessage'>) => (
	define<string | undefined>('fieldEmailOptional', (value) => (
		is(value, optional(email())) || invalidErrorMessage)) as Return<T>
)

export const fieldEmail = <T extends boolean = false>({
	requiredErrorMessage = 'This field is required',
	invalidErrorMessage = 'Has to between a valid email',
	isOptional,
}: DefaultProps<T> = {}): Return<T> => {
	if (isOptional) return optionalEmail<T>({ invalidErrorMessage })
	return requiredEmail<T>({ requiredErrorMessage, invalidErrorMessage })
}
