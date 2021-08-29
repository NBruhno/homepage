const messages = {
	required: 'This field is required',
}

const returnUndefined = (): undefined => undefined

const validateRequired = (value: any) => value ? null : messages.required

export const validators = ({ required, disabled }: { required: boolean, disabled: boolean }) => (
	(required && !disabled) ? validateRequired : returnUndefined
)
