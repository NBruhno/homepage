import { isRegExp, isFunction, isBoolean } from 'lodash-es'

const messages = {
	required: 'This field is required',
	generic: 'Entry is invalid',
	type: {
		email: 'This does not look like an email',
		tel: 'This is not a valid phone number',
		number: 'This has to be a number',
	},
}

const returnUndefined = () => undefined

const validateRequired = (value) => value ? undefined : messages.required

const wrapRegex = (regex, message = messages.generic) => (value) => !value || regex.test(value) ? undefined : message

const wrapFunction = (func) => (value, allValues, props) => {
	if (!value) {
		return undefined
	}

	const result = func(value, allValues, props)

	if (isBoolean(result)) {
		return result ? undefined : messages.generic
	}

	return result
}

const typeValidators = {
	email: wrapRegex(/^\S+@\S+\.\S+$/, messages.type.email),
	tel: wrapRegex(/^[0-9]{8}$/, messages.type.tel),
	number: wrapRegex(/^[0-9]*$/, messages.type.number),
}

const composeValidators = (...validators) => (value) => validators.reduce((error, validator) => error || validator(value), undefined)

export const validators = ({ required, validate, type }) => composeValidators(
	required ? validateRequired : returnUndefined,
	typeValidators[type] || returnUndefined,
	isRegExp(validate) ? wrapRegex(validate) : returnUndefined,
	isFunction(validate) ? wrapFunction(validate) : returnUndefined,
)
