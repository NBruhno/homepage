import type { CommonSelectProps, SelectOption } from '../CommonProps'
import type { UseComboboxState, UseComboboxStateChangeOptions } from 'downshift'
import type { FieldPathByValue, FieldValues } from 'react-hook-form'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { useCombobox, useMultipleSelection } from 'downshift'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { matchSorter } from 'match-sorter'
import { useRef, useState, useCallback } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { Portal } from 'components/Portal'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputClearButton, InputButtonContainer, InputMenuIndicator, SelectMenu, SelectMenuAnchor, InputContainer, InputComponent } from '../Shared'

import { Chip } from './Chip'
import { handleKeyboardInput } from './handleKeyboardInput'

type Props<Path> = CommonSelectProps<Path>

const getFilteredOptions = (options: Array<SelectOption>, selectedOptions: Array<SelectOption>, inputValue: string) => {
	if (isEmpty(inputValue)) return options
	return matchSorter(options, inputValue, { keys: ['label'] })
}

export const MultiSelect = <TFieldValues extends FieldValues, Path extends FieldPathByValue<TFieldValues, string>>({
	showOptionalHint = true, isFullWidth = true, isRequired = false, maxNumberOfOptionsVisible = 40,
	isDisabled = false, name, label, hint, placeholder, options, shouldAutofocus = false, isLoading = false,
}: Props<Path>) => {
	const id = useUnique(name)
	const { formState: { errors }, control } = useFormContext()
	const { field } = useController({ name, control, rules: { required: isRequired ? 'This field is required' : false } })
	const initialValues = field.value as Array<SelectOption['value']> | undefined

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
	} = useMultipleSelection<SelectOption>({
		initialSelectedItems: initialValues ? initialValues.map((initialValue) => options.find(({ value }) => value === initialValue)!) : [],
		onSelectedItemsChange: ({ selectedItems: selectedOptions }) => {
			setFilteredOptions(getFilteredOptions(options, selectedOptions ?? [], inputValue))
			if (selectedOptions === undefined || selectedOptions.length === 0) return field.onChange(undefined)
			return field.onChange(selectedOptions.map(({ value }) => value))
		},
	})

	const {
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
		stateReducer: useCallback((state: UseComboboxState<SelectOption>, actionAndChanges: UseComboboxStateChangeOptions<SelectOption>) => {
			const { type, changes } = actionAndChanges
			switch (type) {
				// Prevent menu from exiting after selecting an option
				case useCombobox.stateChangeTypes.ItemClick: {
					return {
						...changes,
						isOpen: true,
					}
				}
				default: return changes
			}
		}, []),
	})

	const error = get(errors, name)
	const hasError = Boolean(error)

	const onResetHighlightedChip = () => onSetHighlightedChip(-1)
	const onResetHighlightedOption = () => onSetHighlightedOption(-1)
	const resetInputValue = () => {
		setInputValue('')
		setInternalInputValue('')
	}
	const onAddChip = (item: SelectOption) => {
		if (selectedOptions.some((selectedOption) => isEqual(selectedOption, item))) {
			onRemoveChip(item)
			return onResetHighlightedChip()
		}
		return onAddSelectedOption(item)
	}

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
				<div css={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
						isDisabled={isDisabled}
						hasError={hasError}
						shouldFill={false}
						value={inputValue}
						onFocus={(event) => {
							onOpenMenu()
							if (!isInputFocus) setIsInputFocus(true)
							if (focusProps.onFocus) focusProps.onFocus(event)
						}}
						id={id}
						autoFocus={shouldAutofocus}
						onBlur={async (event) => {
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
				<InputButtonContainer>
					<InputClearButton
						isVisible={field.value !== undefined && !isEmpty(field.value)}
						onClick={() => {
							reset()
							resetInputValue()
						}}
					/>
					<InputMenuIndicator isMenuOpen={isMenuOpen} isLoading={isLoading} />
				</InputButtonContainer>
			</InputContainer>
			<Portal>
				<SelectMenu
					{...getMenuProps() as Record<string, unknown>}
					containerRef={containerRef}
					getItemProps={getItemProps}
					highlightedOptionIndex={highlightedOptionIndex === -1 ? 0 : highlightedOptionIndex}
					isOpen={isMenuOpen}
					maxNumberOfOptionsVisible={maxNumberOfOptionsVisible}
					onSelectOption={onAddChip}
					options={filteredOptions}
					selectedItems={selectedOptions}
				/>
			</Portal>
			<InputError hasError={hasError} errorMessage={error?.message as string | undefined} hasFocus={isFocusVisible} />
		</FieldWrapper>
	)
}
