import type { Struct } from 'superstruct'

import { define, is } from 'superstruct'

type Options = {
	message: string,
	type?: string,
}

export const message = <T>(struct: Struct<T, any>, { message, type }: Options): Struct<T, any> => (
	define('message', (value) => (is(value, struct) ? true : {
		type,
		message,
		value,
	}))
)
