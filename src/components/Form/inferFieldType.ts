import type { AnyStruct } from 'superstruct/dist/utils'

export const inferFieldType = (struct: AnyStruct | undefined) => {
	if (!struct) return undefined
	const structType = struct.type.toLowerCase()
	if (structType.includes('number')) return 'number'
	if (structType.includes('password')) return 'password'
	if (structType.includes('email')) return 'email'

	return undefined
}
