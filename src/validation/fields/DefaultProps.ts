export type DefaultFields = {
	requiredErrorMessage: string,
	invalidErrorMessage: string,
}

export type DefaultProps<T = false> = Partial<DefaultFields> & {
	isOptional?: T,
}
