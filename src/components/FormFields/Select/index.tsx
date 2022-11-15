import type { CommonSelectProps } from '../CommonProps'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { useCombobox } from 'downshift'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { matchSorter } from 'match-sorter'
import { useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { filterUnspecified } from 'lib/filterUnspecified'
import { useUnique } from 'lib/hooks'

import { Portal } from 'components/Portal'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputButtonContainer, InputClearButton, InputMenuIndicator, SelectMenu, InputComponent, InputContainer } from '../Shared'

type Props<Path> = CommonSelectProps<Path>

export const Select = <TFieldValues extends FieldValues, Path extends FieldPathByValue<TFieldValues, string>>({
	showOptionalHint = true, isFullWidth = true, isRequired = false, maxNumberOfOptionsVisible = 40,
	isDisabled = false, name, label, hint, placeholder, options, shouldAutofocus = false, isLoading = false,
}: Props<Path>) => {
	const id = useUnique(name)
	const { formState: { errors }, control } = useFormContext<TFieldValues>()
	const [filteredOptions, setFilteredOptions] = useState(options)
	const [isInputFocus, setIsInputFocus] = useState(false)
	const { field } = useController<TFieldValues, Path>({ name, control, rules: { required: isRequired ? 'This field is required' : false } })
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const { isOpen: isMenuOpen, selectedItem, getLabelProps, getMenuProps, highlightedIndex, getItemProps, getInputProps, inputValue, reset, openMenu: onOpenMenu, closeMenu: onCloseMenu, setInputValue } = useCombobox({
		id,
		initialInputValue: options.find(({ value }) => value === field.value)?.label ?? '',
		initialSelectedItem: options.find(({ value }) => value === field.value),
		items: filteredOptions,
		itemToString: (item) => item?.label ?? '',
		onSelectedItemChange: ({ selectedItem }) => field.onChange(selectedItem?.value),
		onIsOpenChange: ({ isOpen, selectedItem, inputValue }) => {
			// If the user clears the field and exits the menu, we assume the user wants to reset the field
			if (!isOpen && (inputValue === '' || inputValue === undefined)) {
				field.onChange(undefined)
				setInputValue('')
			// If the user closes the menu and an item has already been selected, we reset to the already selected item
			} else if (!isOpen) setInputValue(selectedItem?.label ?? '')
		},
		onInputValueChange: ({ inputValue }) => {
			if (isEmpty(inputValue) || inputValue === undefined) setFilteredOptions(options)
			else setFilteredOptions(matchSorter(options, inputValue, { keys: ['label'] }))
		},
	})

	const { hoverProps, isHovered } = useHover({})
	const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, autoFocus: shouldAutofocus })

	const error = get(errors, name)
	const hasError = Boolean(error)

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170}>
			<LabelContainer {...getLabelProps()} htmlFor={id}>
				<span>{label} {showOptionalHint && !isRequired && <Hint>(Optional)</Hint>}</span>
				{hint && <Hint>{hint}</Hint>}
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
					else {
						onOpenMenu()
						inputRef.current?.focus()
					}
				}}
				ref={containerRef}
			>
				<InputComponent
					{...getInputProps({
						ref: inputRef,
						name,
						placeholder,
						onFocus: onOpenMenu,
						onClick: onOpenMenu,
					}) as Record<string, unknown>}
					{...focusProps}
					value={inputValue}
					hasError={hasError}
					isDisabled={isDisabled}
					id={id}
					autoFocus={shouldAutofocus}
					onFocus={(event) => {
						event.target.select()
						onOpenMenu()
						if (!isInputFocus) setIsInputFocus(true)
						if (focusProps.onFocus) focusProps.onFocus(event)
					}}
					onBlur={async (event) => {
						onCloseMenu()
						if (isInputFocus) setIsInputFocus(false)
						if (focusProps.onBlur) focusProps.onBlur(event)
					}}
				/>
				<InputButtonContainer>
					<InputClearButton isVisible={field.value !== undefined} onClick={reset} />
					<InputMenuIndicator isMenuOpen={isMenuOpen} isLoading={isLoading} />
				</InputButtonContainer>
			</InputContainer>
			<Portal>
				<SelectMenu
					{...getMenuProps() as Record<string, unknown>}
					containerRef={containerRef}
					getItemProps={getItemProps}
					highlightedOptionIndex={highlightedIndex}
					isOpen={isMenuOpen}
					maxNumberOfOptionsVisible={maxNumberOfOptionsVisible}
					options={filteredOptions}
					selectedItems={filterUnspecified([selectedItem])}
				/>
			</Portal>
			<InputError hasError={hasError} errorMessage={error?.message as string | undefined} hasFocus={isFocusVisible} />
		</FieldWrapper>
	)
}
