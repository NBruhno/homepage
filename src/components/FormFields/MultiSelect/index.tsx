import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { useCombobox, useMultipleSelection } from 'downshift'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { matchSorter } from 'match-sorter'
import { useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputClearButton } from '../Shared'

import { Chip } from './Chip'
import { FieldContainer } from './FieldContainer'
import { InputComponent } from './InputComponent'
import { Menu } from './Menu'
import { MenuAnchor } from './MenuAnchor'

export type Option = {
	label: string,
	value: boolean | number | string,
	isDisabled?: boolean,
}

type Props = {
	name: string,
	label: string,
	options: Array<Option>,

	hint?: string,
	isDisabled?: boolean,
	isFullWidth?: boolean,
	isRequired?: boolean,
	placeholder?: string,
	showOptionalHint?: boolean,
	shouldAutofocus?: boolean,
	/** How many options are visible at a time in the menu. This is to avoid having to implement a virtualized list */
	maxOptionsVisible?: number,
}

const getFilteredOptions = (options: Array<Option>, selectedOptions: Array<Option>, inputValue: string) => {
	const unselectedOptions = options.filter(({ value }) => !selectedOptions.some((selectedOption) => selectedOption.value === value))
	if (isEmpty(inputValue)) return unselectedOptions
	return matchSorter(unselectedOptions, inputValue, { keys: ['label'] })
}

export const MultiSelect = ({
	showOptionalHint = true, isFullWidth = true, isRequired = false, maxOptionsVisible = 40,
	isDisabled = false, name, label, hint, placeholder, options, shouldAutofocus = false,
}: Props) => {
	const id = useUnique(name)
	const { formState: { errors }, control } = useFormContext()
	const [filteredOptions, setFilteredOptions] = useState(options)
	const [isInputFocus, setIsInputFocus] = useState(false)
	const { field } = useController({ name, control, rules: { required: isRequired ? 'This field is required' : false } })
	const [inputValue, setInputValue] = useState<string>('')
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const initialValues = field.value as Array<Option['value']> | undefined

	const { getDropdownProps, getSelectedItemProps, addSelectedItem, removeSelectedItem, selectedItems, reset, activeIndex, setActiveIndex } = useMultipleSelection<Option>({
		initialSelectedItems: initialValues ? initialValues.map((initialValue) => options.find(({ value }) => value === initialValue)!) : [],
		onSelectedItemsChange: ({ selectedItems }) => {
			setFilteredOptions(getFilteredOptions(options, selectedItems ?? [], inputValue))
			if (selectedItems === undefined || selectedItems.length === 0) return field.onChange(undefined)
			return field.onChange(selectedItems.map(({ value }) => value))
		},
	})

	const { isOpen: isMenuOpen, getLabelProps, getMenuProps, highlightedIndex, getItemProps, getInputProps, getComboboxProps, openMenu, closeMenu, setHighlightedIndex, setInputValue: setInternalInputValue } = useCombobox({
		id,
		items: filteredOptions,
		itemToString: () => '',
		onInputValueChange: ({ inputValue }) => {
			setInputValue(inputValue ?? '')
			setFilteredOptions(getFilteredOptions(options, selectedItems, inputValue ?? ''))
		},
	})

	const { hoverProps, isHovered } = useHover({ isDisabled })
	const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, autoFocus: shouldAutofocus })

	const error = get(errors, name)
	const hasError = Boolean(error)

	const inputProps = getInputProps({
		...getDropdownProps({ preventKeyAction: isMenuOpen, ref: inputRef }) as object,
		name,
		placeholder,
		onFocus: openMenu,
		onClick: openMenu,
	}) as { onKeyDown: (event: any) => void }

	const addItem = (item: Option) => {
		setInputValue('')
		setInternalInputValue('')
		addSelectedItem(item)
		setHighlightedIndex(0)
	}

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170} {...getComboboxProps()}>
			<LabelContainer {...getLabelProps()}>
				<label htmlFor={id}>{label} {showOptionalHint && !isRequired && <Hint>(Optional)</Hint>}</label>
				{hint && <Hint>{hint}</Hint>}
			</LabelContainer>
			<MenuAnchor>
				<FieldContainer
					{...hoverProps}
					hasError={hasError}
					isDisabled={isDisabled}
					isHovered={isHovered}
					isFocusVisible={isFocusVisible}
					isFocus={isInputFocus}
					onClick={(event) => {
						if (event.defaultPrevented) return undefined
						else {
							openMenu()
							inputRef.current?.focus()
						}
					}}
					ref={containerRef}
				>
					<div css={{
						display: 'flex',
						gap: '8px',
						flexWrap: 'wrap',
						paddingRight: '32px',
					}}
					>
						{selectedItems.map((item, index) => (
							<Chip
								option={item}
								key={index}
								isSelected={activeIndex === index}
								onRemoveChip={removeSelectedItem}
								{...getSelectedItemProps({ selectedItem: item, index })}
							/>
						))}
						<InputComponent
							{...inputProps}
							{...focusProps}
							{...hoverProps}
							isDisabled={isDisabled}
							hasError={hasError}
							value={inputValue}
							onFocus={(event) => {
								openMenu()
								if (!isInputFocus) setIsInputFocus(true)
								if (focusProps.onFocus) focusProps.onFocus(event)
							}}
							id={id}
							autoFocus={shouldAutofocus}
							onBlur={(event) => {
								setInputValue('')
								if (isInputFocus) setIsInputFocus(false)
								if (focusProps.onBlur) focusProps.onBlur(event)
							}}
							// We want to close the menu if the user exists using tab
							onKeyDown={(event) => {
								if (focusProps.onKeyDown) focusProps.onKeyDown(event)
								if (isMenuOpen) {
									switch (event.key) {
										case 'Tab': {
											closeMenu()
											break
										}
										case 'Enter': {
											event.preventDefault()
											addItem(filteredOptions[highlightedIndex === -1 ? 0 : highlightedIndex])
											break
										}
										case 'ArrowDown': {
											if (highlightedIndex !== filteredOptions.length) setHighlightedIndex(highlightedIndex + 1)
											break
										}
										case 'ArrowUp': {
											if (highlightedIndex !== 0) setHighlightedIndex(highlightedIndex - 1)
											break
										}
										case 'ArrowRight': {
											if (isEmpty(inputValue)) {
												if (activeIndex === selectedItems.length) {
													setHighlightedIndex(-1)
													inputRef.current?.focus()
												} else if (activeIndex !== -1) setActiveIndex(activeIndex + 1)
											}
											break
										}
										case 'ArrowLeft': {
											if (isEmpty(inputValue)) {
												if (activeIndex === -1) setActiveIndex(selectedItems.length - 1)
												else if (activeIndex !== 0) setActiveIndex(activeIndex - 1)
											}
											break
										}
										case 'Backspace': {
											if (selectedItems.length > 0 && isEmpty(inputValue)) {
												if (activeIndex !== -1) {
													removeSelectedItem(selectedItems[activeIndex])
													setActiveIndex(-1)
												} else {
													removeSelectedItem(selectedItems.at(-1)!)
													setActiveIndex(-1)
												}
											}
											break
										}
										default: setActiveIndex(-1)
									}
								}
							}}
						/>
					</div>
				</FieldContainer>
				<InputClearButton
					isVisible={field.value !== undefined && !isEmpty(field.value)}
					onClick={() => {
						reset()
						setInputValue('')
					}}
				/>
				<Menu
					options={filteredOptions}
					isOpen={isMenuOpen}
					highlightedIndex={highlightedIndex === -1 ? 0 : highlightedIndex}
					hasError={hasError}
					getItemProps={getItemProps}
					maxOptionsVisible={maxOptionsVisible}
					containerHeight={containerRef.current?.getBoundingClientRect().height ?? 0}
					addSelectedItem={addItem}
					{...getMenuProps()}
				/>
			</MenuAnchor>
			<InputError hasError={hasError} errorMessage={error?.message as string | undefined} hasFocus={isFocusVisible} />
		</FieldWrapper>
	)
}
