import type { Value } from '../Value'

import { isRegExp } from 'lodash'

const messages = {
	required: 'This field is required',
	generic: 'Entry is invalid',
	type: {
		email: 'This does not look like an email',
		number: 'This has to be a number',
		password: 'Needs to be 14 to 64 characters long',
		tel: 'This is not a valid phone number',
		username: 'Needs to be 2 to 64 characters long',
	},
}

const returnUndefined = (): undefined => undefined

const validateRequired = (value: Value) => value ? undefined : messages.required

const wrapRegex = (regex: RegExp, message = messages.generic) => (value: Value) => !value || regex.test(value.toString()) ? undefined : message

// const wrapFunction = (func: (value: Value, allValues: Array<Value>, props: any) => Value) => (value: string, allValues: Array<Value>, props: any) => {
// 	if (!value) {
// 		return undefined
// 	}

// 	const result = func(value, allValues, props)

// 	if (isBoolean(result)) {
// 		return result ? undefined : messages.generic
// 	}

// 	return result
// }

const composeValidators = (...validators: Array<(value: Value) => string | undefined>) => (value: Value) => validators.reduce((error: string | undefined, validator) => error ?? validator(value), undefined)

type Props = {
	isRequired: boolean,
	shouldValidate: boolean,
	type: 'email' | 'hidden' | 'multiline' | 'number' | 'password' | 'tel' | 'text' | 'username',
	isDisabled: boolean,
}

const validateType = (type: Props['type']) => {
	switch (type) {
		case 'email': return wrapRegex(/^\S+@\S+\.\S+$/, messages.type.email)
		case 'number': return wrapRegex(/^[0-9]*$/, messages.type.number)
		case 'password': return wrapRegex(/^\S{14,64}$/, messages.type.password)
		case 'username': return wrapRegex(/^\w{2,64}$/, messages.type.username)
		case 'tel': return wrapRegex(/^[0-9]{8}$/, messages.type.tel)
		default: return undefined
	}
}

export const validators = ({ isRequired, shouldValidate, type, isDisabled }: Props) => composeValidators(
	(isRequired && !isDisabled) ? validateRequired : returnUndefined,
	validateType(type) ?? returnUndefined,
	isRegExp(shouldValidate) ? wrapRegex(shouldValidate) : returnUndefined,
	// isFunction(shouldValidate) ? wrapFunction(shouldValidate) : returnUndefined,
)
