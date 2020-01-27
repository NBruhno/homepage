const messages = {
	required: 'This field is required',
}

const returnUndefined = () => undefined

const validateRequired = (value) => value ? null : messages.required

const validateRequiredArray = (value) => value && value.length > 0 ? null : messages.required

const composeValidators = (...validators) => (value) => validators.reduce((error, validator) => error || validator(value), undefined)

export default ({ required, multiple }) => composeValidators(
	required && !multiple ? validateRequired : returnUndefined,
	required && multiple ? validateRequiredArray : returnUndefined,
)
