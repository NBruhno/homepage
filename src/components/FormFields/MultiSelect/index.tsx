import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { useCombobox, useMultipleSelection } from 'downshift'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { matchSorter } from 'match-sorter'
import { useRef, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { delay } from 'lib/delay'
import { useUnique } from 'lib/hooks'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputClearButton } from '../Shared'

import { Chip } from './Chip'
import { FieldContainer } from './FieldContainer'
import { handleKeyboardInput } from './handleKeyboardInput'
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
	const { field } = useController({ name, control, rules: { required: isRequired ? 'This field is required' : false } })
	const initialValues = field.value as Array<Option['value']> | undefined

	const [filteredOptions, setFilteredOptions] = useState(options)
	const [isInputFocus, setIsInputFocus] = useState(false)
	const [inputValue, setInputValue] = useState<string>('')
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const { hoverProps, isHovered } = useHover({ isDisabled })
	const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, autoFocus: shouldAutofocus })

	const {
		getDropdownProps,
		getSelectedItemProps,

		activeIndex: highlightedChipIndex,
		addSelectedItem: onAddSelectedOption,
		removeSelectedItem: onRemoveChip,
		reset,
		selectedItems: selectedOptions,
		setActiveIndex: onSetHighlightedChip,
	} = useMultipleSelection<Option>({
		initialSelectedItems: initialValues ? initialValues.map((initialValue) => options.find(({ value }) => value === initialValue)!) : [],
		onSelectedItemsChange: ({ selectedItems: selectedOptions }) => {
			setFilteredOptions(getFilteredOptions(options, selectedOptions ?? [], inputValue))
			if (selectedOptions === undefined || selectedOptions.length === 0) return field.onChange(undefined)
			return field.onChange(selectedOptions.map(({ value }) => value))
		},
	})

	const {
		getComboboxProps,
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,

		closeMenu: onCloseMenu,
		highlightedIndex: highlightedOptionIndex,
		isOpen: isMenuOpen,
		openMenu: onOpenMenu,
		setHighlightedIndex: onSetHighlightedOption,
		setInputValue: setInternalInputValue,
	} = useCombobox({
		id,
		items: filteredOptions,
		itemToString: () => '',
		onInputValueChange: ({ inputValue }) => {
			setInputValue(inputValue ?? '')
			setFilteredOptions(getFilteredOptions(options, selectedOptions, inputValue ?? ''))
		},
	})

	const error = get(errors, name)
	const hasError = Boolean(error)

	const onResetHighlightedChip = () => onSetHighlightedChip(-1)
	const onResetHighlightedOption = () => onSetHighlightedOption(-1)
	const resetInputValue = () => {
		setInputValue('')
		setInternalInputValue('')
	}
	const onAddChip = (item: Option) => {
		resetInputValue()
		onAddSelectedOption(item)
		onSetHighlightedOption(0)
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
							onOpenMenu()
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
						{selectedOptions.map((option, index) => (
							<Chip
								key={index}
								isHighlighted={highlightedChipIndex === index}
								onRemoveChip={() => {
									onRemoveChip(option)
									onResetHighlightedChip()
								}}
								{...getSelectedItemProps({ selectedItem: option, index })}
							>
								{option.label}
							</Chip>
						))}
						<InputComponent
							{...getInputProps({
								...getDropdownProps({ preventKeyAction: isMenuOpen, ref: inputRef }) as object,
								name,
								placeholder,
								onFocus: onOpenMenu,
								onClick: () => {
									onOpenMenu() // Always open the menu on interaction with component
									onResetHighlightedChip() // If the user re-selects the input, reset the highlighted chip
								},
							})}
							{...focusProps}
							{...hoverProps}
							isDisabled={isDisabled}
							hasError={hasError}
							value={inputValue}
							onFocus={(event) => {
								onOpenMenu()
								if (!isInputFocus) setIsInputFocus(true)
								if (focusProps.onFocus) focusProps.onFocus(event)
							}}
							id={id}
							autoFocus={shouldAutofocus}
							onBlur={async (event) => {
								await delay(20) // We wait before resetting to make sure if the user clicks the menu, it does not reset before interaction
								resetInputValue() // We always reset the search when exiting the field
								onResetHighlightedChip() // Exiting the field should reset the selected chip
								if (isInputFocus) setIsInputFocus(false)
								if (focusProps.onBlur) focusProps.onBlur(event)
							}}
							// We want to close the menu if the user exists using tab
							onKeyDown={(event) => {
								if (focusProps.onKeyDown) focusProps.onKeyDown(event)
								handleKeyboardInput(event, {
									filteredOptions,
									selectedOptions,
									highlightedChipIndex,
									highlightedOptionIndex,
									inputRef,
									inputValue,
									isMenuOpen,
									onAddChip,
									onCloseMenu,
									onRemoveChip,
									onResetHighlightedChip,
									onResetHighlightedOption,
									onSetHighlightedChip,
									onSetHighlightedOption,
								})
							}}
						/>
					</div>
				</FieldContainer>
				<InputClearButton
					isVisible={field.value !== undefined && !isEmpty(field.value)}
					onClick={() => {
						reset()
						resetInputValue()
					}}
				/>
				<Menu
					options={filteredOptions}
					isOpen={isMenuOpen}
					highlightedOptionIndex={highlightedOptionIndex === -1 ? 0 : highlightedOptionIndex}
					hasError={hasError}
					getItemProps={getItemProps}
					maxOptionsVisible={maxOptionsVisible}
					containerHeight={containerRef.current?.getBoundingClientRect().height ?? 0}
					onAddChip={onAddChip}
					{...getMenuProps()}
				/>
			</MenuAnchor>
			<InputError hasError={hasError} errorMessage={error?.message as string | undefined} hasFocus={isFocusVisible} />
		</FieldWrapper>
	)
}
