import type { Value } from '../Value'

const messages = {
	required: 'This field is required',
}

const returnUndefined = (): undefined => undefined

const validateRequired = (value: Value) => value ? undefined : messages.required

const validateRequiredArray = (value: Value) => value && typeof value === 'string' && value.length > 0 ? undefined : messages.required

const composeValidators = (...validators: Array<(value: Value) => string | undefined>) => (value: Value) => validators.reduce((error: string | undefined, validator) => error ?? validator(value), undefined)

export const validators = ({ isRequired, hasMultiple, isDisabled }: { isRequired: boolean, hasMultiple: boolean, isDisabled: boolean }) => composeValidators(
	(isRequired && !hasMultiple && !isDisabled) ? validateRequired : returnUndefined,
	(isRequired && hasMultiple && !isDisabled) ? validateRequiredArray : returnUndefined,
)
