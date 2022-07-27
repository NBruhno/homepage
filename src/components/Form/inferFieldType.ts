import type { AnyStruct } from 'superstruct/lib/utils'

import lowerCase from 'lodash/lowerCase'

export const inferFieldType = (struct: AnyStruct | undefined) => {
	if (!struct) return undefined
	const structType = lowerCase(struct.type)
	if (structType.includes('number')) return 'number'
	if (structType.includes('password')) return 'password'
	if (structType.includes('email')) return 'email'

	return undefined
}
