const messages = {
	required: 'This field is required',
}

const returnUndefined = (): undefined => undefined

const validateRequired = (value: any) => value ? null : messages.required

const validateRequiredArray = (value: any) => value && value.length > 0 ? null : messages.required

const composeValidators = (...validators: Array<any>) => (value: any) => validators.reduce((error, validator) => error || validator(value), undefined)

export const validators = ({ required, multiple, disabled }: { required: boolean, multiple: boolean, disabled: boolean }) => composeValidators(
	(required && !multiple && !disabled) ? validateRequired : returnUndefined,
	(required && multiple && !disabled) ? validateRequiredArray : returnUndefined,
)
