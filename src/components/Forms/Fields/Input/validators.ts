import { isRegExp, isFunction, isBoolean } from 'lodash-es'

const messages = {
	required: 'This field is required',
	generic: 'Entry is invalid',
	type: {
		email: 'This does not look like an email',
		tel: 'This is not a valid phone number',
		number: 'This has to be a number',
		password: 'Needs to be 14 to 64 characters long',
	},
}

const returnUndefined = (): undefined => undefined

const validateRequired = (value: any) => value ? undefined : messages.required

const wrapRegex = (regex: RegExp, message = messages.generic) => (value: any) => !value || regex.test(value) ? undefined : message

const wrapFunction = (func: (value: any, allValues: Array<any>, props: any) => any) => (value: any, allValues: Array<any>, props: any) => {
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
	password: wrapRegex(/^.{14,64}$/, messages.type.password),
	number: wrapRegex(/^[0-9]*$/, messages.type.number),
}

const composeValidators = (...validators: Array<any>) => (value: any) => validators.reduce((error, validator) => error || validator(value), undefined)

export const validators = ({ required, validate, type }: { required: boolean, validate: boolean, type: string }) => composeValidators(
	required ? validateRequired : returnUndefined,
	((type === 'email' || type === 'tel' || type === 'number' || type === 'password') && typeValidators[type]) || returnUndefined,
	isRegExp(validate) ? wrapRegex(validate) : returnUndefined,
	isFunction(validate) ? wrapFunction(validate) : returnUndefined,
)
