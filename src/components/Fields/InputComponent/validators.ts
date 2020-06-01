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

const returnUndefined = (): undefined => undefined

const validateRequired = (value: any) => value ? undefined : messages.required

const wrapRegex = (regex: RegExp, message = messages.generic) => (value: any) => !value || regex.test(value) ? undefined : message

const wrapFunction = (func: (value: any, allValues: any[], props: any) => any) => (value: any, allValues: any[], props: any) => {
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

const composeValidators = (...validators: any[]) => (value: any) => validators.reduce((error, validator) => error || validator(value), undefined)

export const validators = ({ required, validate, type }: { required: boolean, validate: boolean, type: string }) => composeValidators(
	required ? validateRequired : returnUndefined,
	((type === 'email' || type === 'tel' || type === 'number') && typeValidators[type]) || returnUndefined,
	isRegExp(validate) ? wrapRegex(validate) : returnUndefined,
	isFunction(validate) ? wrapFunction(validate) : returnUndefined,
)
