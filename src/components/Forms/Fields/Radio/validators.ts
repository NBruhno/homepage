const messages = {
	required: 'This field is required',
}

const returnUndefined = (): undefined => undefined

const validateRequired = (value: any) => value ? null : messages.required

export const validators = ({ required }: { required: boolean }) => required ? validateRequired : returnUndefined
