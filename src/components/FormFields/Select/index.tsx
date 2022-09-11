import type { FieldPathByValue, FieldValues } from 'react-hook-form'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { useCombobox } from 'downshift'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { matchSorter } from 'match-sorter'
import { useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputClearButton } from '../Shared'

import { Menu } from './Menu'
import { MenuAnchor } from './MenuAnchor'
import { SelectComponent } from './SelectComponent'

export type Option = {
	label: string,
	value: boolean | number | string,
	isDisabled?: boolean,
}

type Props<Path> = {
	name: Path,
	label: string,
	options: Array<Option>,

	hint?: string,
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isRequired?: boolean,
	isMultiple?: boolean,
	placeholder?: string,
	showOptionalHint?: boolean,
	shouldAutofocus?: boolean,
	/** How many options are visible at a time in the menu. This is to avoid having to implement a virtualized list */
	maxOptionsVisible?: number,
}

export const Select = <TFieldValues extends FieldValues, Path extends FieldPathByValue<TFieldValues, string>>({
	showOptionalHint = true, isFullWidth = true, isRequired = false, isMultiple = false, maxOptionsVisible = 40,
	isDisabled = false, name, label, hint, placeholder, options, shouldAutofocus = false,
}: Props<Path>) => {
	const id = useUnique(name)
	const { formState: { errors }, control } = useFormContext<TFieldValues>()
	const [filteredOptions, setFilteredOptions] = useState(options)
	const { field } = useController<TFieldValues, Path>({ name, control, rules: { required: isRequired ? 'This field is required' : false } })

	const { isOpen: isMenuOpen, selectedItem, getLabelProps, getMenuProps, highlightedIndex, getItemProps, getInputProps, getComboboxProps, inputValue, reset, openMenu, closeMenu, setInputValue } = useCombobox({
		id,
		initialInputValue: options.find(({ value }) => value === field.value)?.label ?? '',
		initialSelectedItem: options.find(({ value }) => value === field.value),
		items: filteredOptions,
		itemToString: (item) => item?.label ?? '',
		onSelectedItemChange: ({ selectedItem }) => {
			// If the user can only select one item, there is no need to keep the menu open, requiring extra interaction to continue
			if (!isMultiple) closeMenu()
			return field.onChange(selectedItem?.value)
		},
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
			else if (isMultiple) setFilteredOptions(matchSorter(options.filter(({ label }) => label !== inputValue), inputValue, { keys: ['label'] }))
			else setFilteredOptions(matchSorter(options, inputValue, { keys: ['label'] }))
		},
	})

	const { hoverProps, isHovered } = useHover({})
	const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, autoFocus: shouldAutofocus })

	const error = get(errors, name)
	const hasError = Boolean(error)

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170} {...getComboboxProps()}>
			<LabelContainer {...getLabelProps()}>
				<label htmlFor={id}>{label} {showOptionalHint && !isRequired && <Hint>(Optional)</Hint>}</label>
				{hint && <Hint>{hint}</Hint>}
			</LabelContainer>
			<MenuAnchor>
				<SelectComponent
					{...getInputProps({
						name,
						placeholder,
						onFocus: openMenu,
						onClick: openMenu,
					})}
					{...focusProps}
					{...hoverProps}
					value={inputValue}
					hasError={hasError}
					isDisabled={isDisabled}
					isHovered={isHovered}
					isFocusVisible={isFocusVisible}
					id={id}
					autoFocus={shouldAutofocus}
				/>
				<InputClearButton isVisible={field.value !== undefined} onClick={reset} />
				<Menu
					options={filteredOptions}
					isOpen={isMenuOpen}
					highlightedIndex={highlightedIndex}
					selectedItem={selectedItem}
					hasError={hasError}
					getItemProps={getItemProps}
					maxOptionsVisible={maxOptionsVisible}
					{...getMenuProps()}
				/>
			</MenuAnchor>
			<InputError hasError={hasError} errorMessage={error?.message as string | undefined} hasFocus={isFocusVisible} />
		</FieldWrapper>
	)
}
