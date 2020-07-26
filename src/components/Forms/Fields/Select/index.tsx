import { useField } from 'react-final-form'
import matchSorter from 'match-sorter'
import { useEffect } from 'react'
import Downshift from 'downshift'

import { LabelContainer } from '../LabelContainer'
import { FieldWrapper } from '../FieldWrapper'
import { InputError } from '../InputError'
import { Hint } from '../Hint'

import { MenuAnchor } from './MenuAnchor'
import { validators } from './validators'
import { MenuItem } from './MenuItem'
import { SelectComponent } from './SelectComponent'
import { Menu } from './Menu'

type Props = {
	name: string,
	options: { label: string, value: any, disabled?: boolean }[],

	disabled?: boolean,
	enableValidate?: boolean,
	fullWidth?: boolean,
	hint?: string,
	id?: string,
	label: string,
	multiple?: boolean,
	optionalHint?: boolean,
	optionsLimit?: number,
	placeholder?: string,
	renderLabel?: React.ReactNode,
	required?: boolean,
	validate?: boolean,

	format?: (value: any, name: string) => any,
	parse?: (value: any, name: string) => any,
}

const itemToString = (item: any) => (item || '')

export const Select = ({
	optionalHint = true, fullWidth = true, required = false, enableValidate = true,
	disabled, name, format, parse = (value) => value || null, label,
	hint, placeholder, multiple, options, id = name,
}: Props) => {
	const parseDefault = (value: any) => value || (multiple ? [] : null)

	const { input, meta } = useField(
		name,
		{
			type: 'select',
			parse: parse || parseDefault,
			format,
			allowNull: true,
			validate: (!disabled && enableValidate && validators) ? validators({ required, multiple }) : null,
		},
	)

	useEffect(() => {
		if (input.value === undefined) {
			input.onChange(multiple ? [] : '')
		}
	})

	const hasError = meta.submitFailed && Boolean(meta.error)

	return (
		<Downshift
			{...input}
			id={id}
			itemToString={itemToString}
			selectedItem={input.value}
			onInputValueChange={(inputValue) => {
				input.onChange(inputValue)
			}}
		>
			{({ getInputProps, getItemProps, getMenuProps, getRootProps, getLabelProps, isOpen, inputValue, highlightedIndex, selectedItem }) => {
				const filteredOptions = matchSorter(options, inputValue, { keys: ['label'] })
				return (
					<FieldWrapper fullWidth={fullWidth} minWidth={170} {...getRootProps()}>
						<LabelContainer {...getLabelProps()}>
							<label htmlFor={id}>{label} {optionalHint && !required && <Hint>(Optional)</Hint>}</label>
							{hint && <Hint htmlFor={id}>{hint}</Hint>}
						</LabelContainer>
						<MenuAnchor>
							<SelectComponent {...getInputProps({ name: input.name, placeholder })} onFocus={input.onFocus} onBlur={input.onBlur} hasError={hasError} disabled={disabled} id={id} />
							<Menu hasError={hasError} {...getMenuProps()} isOpen={isOpen && Boolean(filteredOptions.length)}>
								{filteredOptions.map(({ value, label: optionLabel }, index: number) => (
									<MenuItem {...getItemProps({ key: value, index, item: value })} highlightedIndex={highlightedIndex} selectedItem={selectedItem}>
										{optionLabel}
									</MenuItem>
								))}
							</Menu>
						</MenuAnchor>
						<InputError hasError={hasError} errorMessage={meta.error} isFocus={meta.active} />
					</FieldWrapper>
				)
			}}
		</Downshift>
	)
}
