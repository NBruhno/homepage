import { useFocusVisible, useHover } from '@react-aria/interactions'
import { useCombobox } from 'downshift'
import get from 'lodash/get'
import { matchSorter } from 'match-sorter'
import { useEffect, useState, useRef } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'
import { InputClearButton } from '../Shared'

import { Menu } from './Menu'
import { MenuAnchor } from './MenuAnchor'
import { MenuItem } from './MenuItem'
import { SelectComponent } from './SelectComponent'

type Option = {
	label: string,
	value: number | string,
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
}

export const Select = ({
	showOptionalHint = true, isFullWidth = true, isRequired = false,
	isDisabled = false, name, label, hint, placeholder, options,
}: Props) => {
	const id = useUnique(name)
	const { formState: { errors }, control } = useFormContext()
	const [filteredOptions, setFilteredOptions] = useState(options)
	const { field } = useController({ name, control, rules: { required: isRequired ? 'This field is required' : false } })
	const inputRef = useRef<HTMLInputElement>(null)
	const { isOpen, selectedItem, getLabelProps, getMenuProps, highlightedIndex, getItemProps, getInputProps, getComboboxProps, inputValue, reset, openMenu } = useCombobox({
		id,
		initialInputValue: field.value as string | undefined,
		initialSelectedItem: options.find(({ value }) => value === field.value),
		items: filteredOptions,
		itemToString: (item) => item?.label ?? '',
		onSelectedItemChange: ({ selectedItem }) => field.onChange(selectedItem?.value),
	})

	useEffect(() => {
		setFilteredOptions(matchSorter(options.filter(({ label }) => label !== inputValue), inputValue, { keys: ['label'] }))
	}, [inputValue, options])

	const { hoverProps, isHovered } = useHover({})
	const { isFocusVisible } = useFocusVisible({ isTextInput: true })

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
					{...getInputProps({ name, placeholder, ref: inputRef })}
					{...hoverProps}
					hasError={hasError}
					isDisabled={isDisabled}
					isHovered={isHovered}
					isFocusVisible={isFocusVisible}
					id={id}
					onFocus={openMenu}
				/>
				<InputClearButton isVisible={Boolean(field.value)} onClick={reset} />
				<Menu hasError={hasError} {...getMenuProps()} isOpen={isOpen && Boolean(filteredOptions.length)}>
					{filteredOptions.map((item, index: number) => (
						<MenuItem {...getItemProps({ key: `${item.value}-${index}`, index, item })} highlightedIndex={highlightedIndex} selectedItem={selectedItem} key={index}>
							{item.label}
						</MenuItem>
					))}
				</Menu>
			</MenuAnchor>
			<InputError hasError={hasError} errorMessage={error?.message as string | undefined} hasFocus={isFocusVisible} />
		</FieldWrapper>
	)
}
