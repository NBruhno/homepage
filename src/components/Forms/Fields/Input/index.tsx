import { useField } from 'react-final-form'

import { ColumnLabel } from '../ColumnLabel'
import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'

import { HintContainer } from './HintContainer'
import { InputComponent } from './InputComponent'
import { Textarea } from './Textarea'
import { validators } from './validators'

type InputProps = {
	name: string,
	label: string,

	autoComplete?: string,
	autofocus?: boolean,
	disabled?: boolean,
	enableValidate?: boolean,
	fullWidth?: boolean,
	hidden?: boolean,
	hint?: string,
	id?: string,
	maxLength?: number,
	maxRows?: number,
	minLength?: number,
	optionalHint?: boolean,
	pattern?: string,
	placeholder?: string,
	required?: boolean,
	rows?: number,
	type?: string,
	validate?: boolean,

	parse?: (value: any, name: string) => any,
	format?: (value: any, name: string) => any,
}

export const Input = ({
	optionalHint = true, fullWidth = true, required = false, rows = 3, enableValidate = true, type = 'text',
	disabled = false, maxRows = 8, minLength, maxLength, name, format, validate = true, autoComplete = 'off', id= name, hidden,
	parse = (value) => value || null, label, hint, placeholder, autofocus, pattern,
}: InputProps) => {
	const { input, meta } = useField(
		name,
		{
			type,
			parse,
			format,
			allowNull: true,
			validate: (!disabled && enableValidate && validators) ? validators({ required, validate, type }) : undefined,
		},
	)

	const hasError = Boolean(meta.submitFailed) && Boolean(meta.error)

	const defaultProps = {
		autoComplete,
		autoFocus: autofocus,
		disabled,
		hasError,
		id,
		maxLength,
		minLength,
		pattern,
		placeholder,
		value: input.value || '',
		'aria-hidden': hidden,
	}

	if (type === 'hidden') {
		return <input {...input} {...defaultProps} />
	}

	return (
		<FieldWrapper fullWidth={fullWidth} minWidth={170} hidden={hidden}>
			<ColumnLabel>
				<LabelContainer>
					<HintContainer>
						<div>
							<label htmlFor={id}>{label} {optionalHint && !required && <Hint>(Optional)</Hint>}</label>
							{hint && <Hint>{hint}</Hint>}
						</div>
						{maxLength && <Hint htmlFor={id}> {(input.value && input.value.length) || 0} / {maxLength}</Hint>}
					</HintContainer>
				</LabelContainer>
				{type === 'multiline' ? (
					<Textarea
						{...input}
						{...defaultProps}
						rows={rows}
						maxRows={maxRows}
						async
					/>
				) : (
					<InputComponent
						{...input}
						{...defaultProps}
					/>
				)}
				<InputError hasError={hasError} errorMessage={meta.error} isFocus={meta.active} />
			</ColumnLabel>
		</FieldWrapper>
	)
}
