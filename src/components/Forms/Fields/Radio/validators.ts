import type { Value } from '../Value'

const messages = {
	required: 'This field is required',
}

const returnUndefined = (): undefined => undefined

const validateRequired = (value: Value) => value ? null : messages.required

export const validators = ({ isRequired, isDisabled }: { isRequired: boolean, isDisabled: boolean }) => (
	(isRequired && !isDisabled) ? validateRequired : returnUndefined
)
