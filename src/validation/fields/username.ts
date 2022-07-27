import type { DefaultProps, DefaultFields } from './DefaultProps'
import type { Struct } from 'superstruct'

import { define, is, optional } from 'superstruct'

import { username } from 'validation/shared'

type Return<T> = T extends true ? Struct<string | undefined, null> : T extends false ? Struct<string, null> : never

export const requiredUsername = <T = false>({ requiredErrorMessage, invalidErrorMessage }: DefaultFields) => (
	define<string>('fieldUsername', (value) => {
		const isValidUsername = is(value, optional(username()))
		if (!isValidUsername) return invalidErrorMessage
		if (is(value, username())) return true
		return requiredErrorMessage
	}) as Return<T>
)

export const optionalUsername = <T = false>({ invalidErrorMessage }: Pick<DefaultFields, 'invalidErrorMessage'>) => (
	define<string | undefined>('fieldUsernameOptional', (value) => (
		is(value, optional(username())) || invalidErrorMessage)) as Return<T>
)

export const fieldUsername = <T extends boolean = false>({
	requiredErrorMessage = 'This field is required',
	invalidErrorMessage = 'Has to between 2 and 64 characters long',
	isOptional,
}: DefaultProps<T> = {}): Return<T> => {
	if (isOptional) return optionalUsername<T>({ invalidErrorMessage })
	return requiredUsername<T>({ requiredErrorMessage, invalidErrorMessage })
}
