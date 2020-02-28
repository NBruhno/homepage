const messages = {
	required: 'This field is required',
}

const returnUndefined = () => undefined

const validateRequired = (value) => value ? null : messages.required

export default ({ required }) => required ? validateRequired : returnUndefined
