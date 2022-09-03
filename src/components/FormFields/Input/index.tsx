import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { ColumnLabel } from '../ColumnLabel'
import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputClearButton } from '../Shared'

import { HintContainer } from './HintContainer'
import { InputComponent } from './InputComponent'
import { Textarea } from './Textarea'

type Props = {
	label: string,
	name: string,

	autoComplete?: string,
	hint?: string,
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isRequired?: boolean,
	maxLength?: number,
	maxRows?: number,
	minLength?: number,
	minRows?: number,
	placeholder?: string,
	shouldAutofocus?: boolean,
	showOptionalHint?: boolean,
	type?: 'email' | 'hidden' | 'multiline' | 'number' | 'password' | 'tel' | 'text' | 'username',
}

export const Input = ({
	showOptionalHint = true, isFullWidth = true, isRequired = false, minRows = 3, type = 'text',
	isDisabled = false, maxRows = 8, minLength, maxLength, name, autoComplete = 'off',
	label, hint, placeholder, shouldAutofocus,
}: Props) => {
	const id = useUnique(name)
	const { register, formState: { errors }, watch, resetField } = useFormContext()
	const value = watch(name, null) as Date | number | string | undefined
	const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, autoFocus: shouldAutofocus })
	const { hoverProps, isHovered } = useHover({})

	const inputMode = useMemo(() => {
		switch (type) {
			case 'email': return 'email'
			case 'hidden': return 'none'
			case 'number': return 'numeric'
			case 'tel': return 'tel'
			default: return 'text'
		}
	}, [type])
	const inputType = useMemo(() => {
		switch (type) {
			case 'username':
			case 'number': return 'text'
			default: return type
		}
	}, [type])

	const inputProps = register(name, {
		required: isRequired ? 'This field is required' : false,
		disabled: isDisabled,
		maxLength: maxLength ? {
			value: maxLength,
			message: `Cannot be more than ${maxLength} characters long`,
		} : undefined,
		minLength: minLength ? {
			value: minLength,
			message: `Needs to be at least ${minLength} characters long`,
		} : undefined,
		setValueAs: (value: unknown) => {
			if (type === 'number') {
				if (isEmpty(value) || Number.isNaN(value)) return undefined
				return (isString(value) && !isEmpty(value.trim())) ? Number(value) : undefined
			}
			return (isString(value) && isEmpty(value)) ? undefined : value
		},
	})

	const error = get(errors, name)
	const hasError = Boolean(error)

	const defaultProps = {
		...focusProps,
		...hoverProps,
		'aria-hidden': inputType === 'hidden',
		autoComplete,
		autoFocus: shouldAutofocus,
		hasError,
		id,
		maxLength,
		minLength,
		placeholder,
		type: inputType,
		inputMode,
	} as const

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170} hidden={inputType === 'hidden'}>
			<ColumnLabel>
				<LabelContainer>
					<HintContainer>
						<span>
							<label htmlFor={id}>{label} {showOptionalHint && !isRequired && <Hint>(Optional)</Hint>}</label>
							{hint && <Hint>{hint}</Hint>}
						</span>
						{maxLength && <Hint> {(value && typeof value === 'string' && value.length) || 0} / {maxLength}</Hint>}
					</HintContainer>
				</LabelContainer>
				<div css={{ position: 'relative' }}>
					{type === 'multiline' ? (
						<Textarea
							{...inputProps}
							{...defaultProps}
							isDisabled={isDisabled}
							minRows={minRows}
							maxRows={maxRows}
							isHovered={isHovered}
							isFocusVisible={isFocusVisible}
						/>
					) : (
						<InputComponent
							{...inputProps}
							{...defaultProps}
							isHovered={isHovered}
							isFocusVisible={isFocusVisible}
						/>
					)}
					<InputClearButton isVisible={value !== undefined} onClick={() => resetField(name)} />
				</div>
				<InputError
					hasError={hasError}
					errorMessage={error?.message as string | undefined}
					hasFocus={isFocusVisible}
				/>
			</ColumnLabel>
		</FieldWrapper>
	)
}
