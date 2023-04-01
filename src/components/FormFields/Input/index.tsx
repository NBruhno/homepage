import type { FocusEvent, KeyboardEvent } from 'react'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { get, isEmpty, isString } from 'lodash'
import { useMemo, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { ColumnLabel } from '../ColumnLabel'
import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputClearButton, InputContainer, InputComponent, InputButtonContainer, InputVisibleButton } from '../Shared'

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
	const value = watch(name, undefined) as Date | number | string | undefined
	const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, autoFocus: shouldAutofocus })
	const { hoverProps, isHovered } = useHover({})
	const [isInputFocus, setIsInputFocus] = useState(false)
	const [isForcedTextInput, setIsForcedTextInput] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

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
		if (isForcedTextInput) return 'text'
		switch (type) {
			case 'username':
			case 'number': return 'text'
			default: return type
		}
	}, [type, isForcedTextInput])

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
	const labelId = `${id}-label`

	const defaultProps = {
		...inputProps,
		...focusProps,
		hidden: inputType === 'hidden',
		autoComplete,
		autoFocus: shouldAutofocus,
		hasError,
		id,
		maxLength,
		minLength,
		placeholder,
		type: inputType,
		inputMode,
		isDisabled,
		onKeyDown: async (event: KeyboardEvent<HTMLInputElement>) => {
			// Some password managers prevent a proper exit when tabbing out
			if (event.key === 'Tab') {
				inputRef.current?.blur()
				containerRef.current?.blur()
				if (isInputFocus) setIsInputFocus(false)
				// Triggering the blur event manually does not always have an effect.
				if (focusProps.onBlur) focusProps.onBlur(event as unknown as FocusEvent<HTMLInputElement>)
			}
		},
		onFocus: (event: FocusEvent<HTMLInputElement>) => {
			if (!isInputFocus) setIsInputFocus(true)
			if (focusProps.onFocus) focusProps.onFocus(event)
		},
		onBlur: async (event: FocusEvent<HTMLInputElement>) => {
			if (isInputFocus) setIsInputFocus(false)
			if (focusProps.onBlur) focusProps.onBlur(event)
			await inputProps.onBlur(event)
		},
	} as const

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170} isHidden={inputType === 'hidden'}>
			<ColumnLabel>
				<LabelContainer htmlFor={id} id={labelId}>
					<span>{label} {showOptionalHint && !isRequired && <Hint>(Optional)</Hint>} {maxLength && <Hint> {(value && typeof value === 'string' && value.length) || 0} / {maxLength}</Hint>}</span>
				</LabelContainer>
				<InputContainer
					{...hoverProps}
					hasError={hasError}
					isDisabled={isDisabled}
					isHovered={isHovered}
					isFocusVisible={isFocusVisible}
					isFocus={isInputFocus}
					onClick={(event) => {
						if (event.defaultPrevented) return undefined
						else inputRef.current?.focus()
					}}
					ref={containerRef}
				>
					{type === 'multiline' ? (
						<Textarea
							{...defaultProps}
							minRows={minRows}
							maxRows={maxRows}
							isHovered={isHovered}
							isFocusVisible={isFocusVisible}
							ref={(event) => {
								inputProps.ref(event)
								// @ts-expect-error It claims that current on the ref is a read-only property, which is not the case.
								inputRef.current = event
							}}
						/>
					) : (
						<InputComponent
							{...defaultProps}
							ref={(event) => {
								inputProps.ref(event)
								// @ts-expect-error It claims that current on the ref is a read-only property, which is not the case.
								inputRef.current = event
							}}
						/>
					)}
					<InputButtonContainer>
						<InputClearButton isVisible={value !== undefined} onClick={() => resetField(name)} />
						<InputVisibleButton isVisible={type === 'password'} isEnabled={isForcedTextInput} onClick={() => setIsForcedTextInput(!isForcedTextInput)} />
					</InputButtonContainer>
				</InputContainer>
				{hint && !hasError && <Hint>{hint}</Hint>}
				<InputError
					hasError={hasError}
					errorMessage={error?.message as string | undefined}
					hasFocus={isFocusVisible}
				/>
			</ColumnLabel>
		</FieldWrapper>
	)
}
