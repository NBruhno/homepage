import type { Value } from '../Value'

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
	shouldAutofocus?: boolean,
	isDisabled?: boolean,
	enableValidate?: boolean,
	isFullWidth?: boolean,
	isHidden?: boolean,
	hint?: string,
	id?: string,
	maxLength?: number,
	maxRows?: number,
	minLength?: number,
	showOptionalHint?: boolean,
	pattern?: string,
	placeholder?: string,
	isRequired?: boolean,
	rows?: number,
	type?: 'email' | 'hidden' | 'multiline' | 'number' | 'password' | 'tel' | 'text' | 'username',
	shouldValidate?: boolean,

	parse?: (value: Value, name: string) => any,
	format?: (value: Value, name: string) => any,
}

export const Input = ({
	showOptionalHint = true, isFullWidth = true, isRequired = false, rows = 3, enableValidate = true, type = 'text',
	isDisabled = false, maxRows = 8, minLength, maxLength, name, shouldValidate = true, autoComplete = 'off', id= name,
	parse = (value) => value ?? null, label, hint, placeholder, shouldAutofocus, pattern, isHidden = false,
}: InputProps) => {
	const { input, meta } = useField<Value, HTMLInputElement>(
		name,
		{
			type: type === 'username' ? 'text' : type,
			parse,
			allowNull: true,
			validate: validators({ isRequired, shouldValidate, type, isDisabled: !enableValidate || isDisabled }),
		},
	)

	const hasError = Boolean(meta.submitFailed) && Boolean(meta.error)

	const defaultProps = {
		autoComplete,
		autoFocus: shouldAutofocus,
		isDisabled,
		hasError,
		id,
		maxLength,
		minLength,
		pattern,
		placeholder,
		value: input.value ?? '',
		'aria-hidden': isHidden,
	}

	if (type === 'hidden') {
		return <input {...input} {...defaultProps} />
	}

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170} hidden={isHidden}>
			<ColumnLabel>
				<LabelContainer>
					<HintContainer>
						<div>
							<label htmlFor={id}>{label} {showOptionalHint && !isRequired && <Hint>(Optional)</Hint>}</label>
							{hint && <Hint>{hint}</Hint>}
						</div>
						{maxLength && <Hint htmlFor={id}> {(input.value && typeof input.value === 'string' && input.value.length) || 0} / {maxLength}</Hint>}
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
				<InputError hasError={hasError} errorMessage={meta.error as string | undefined} hasFocus={meta.active} />
			</ColumnLabel>
		</FieldWrapper>
	)
}
