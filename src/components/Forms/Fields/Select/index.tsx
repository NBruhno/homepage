import type { Value } from '../Value'
import type { ReactNode } from 'react'

import Downshift from 'downshift'
import { matchSorter } from 'match-sorter'
import { useEffect } from 'react'
import { useField } from 'react-final-form'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { LabelContainer } from '../LabelContainer'

import { Menu } from './Menu'
import { MenuAnchor } from './MenuAnchor'
import { MenuItem } from './MenuItem'
import { SelectComponent } from './SelectComponent'
import { validators } from './validators'

type Props = {
	name: string,
	options: Array<{ label: string, value: number | string, isDisabled?: boolean }>,

	isDisabled?: boolean,
	shouldValidate?: boolean,
	isFullWidth?: boolean,
	hint?: string,
	id?: string,
	label: string,
	hasMultiple?: boolean,
	showOptionalHint?: boolean,
	optionsLimit?: number,
	placeholder?: string,
	renderLabel?: ReactNode,
	isRequired?: boolean,

	format?: (value: Value, name: string) => any,
	parse?: (value: Value, name: string) => any,
}

const itemToString = (item: number | string | null) => item?.toString() ?? ''

export const Select = ({
	showOptionalHint = true, isFullWidth = true, isRequired = false, shouldValidate = true,
	isDisabled = false, name, label, hint, placeholder, hasMultiple = false, options, id = name,
	parse = (value: Value) => value ?? (hasMultiple ? [] : null),
}: Props) => {
	const { input, meta } = useField(
		name,
		{
			type: 'select',
			parse,
			allowNull: true,
			validate: validators({ isRequired, hasMultiple, isDisabled: !shouldValidate || isDisabled }),
		},
	)

	useEffect(() => {
		if (input.value === undefined) {
			input.onChange(hasMultiple ? [] : '')
		}
	})

	const hasError = Boolean(meta.submitFailed) && Boolean(meta.error)

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
			{({ getInputProps, getItemProps, getMenuProps, getRootProps, getLabelProps, isOpen, inputValue = '', highlightedIndex, selectedItem }) => {
				const filteredOptions = matchSorter(options, inputValue ?? '', { keys: ['label'] })
				return (
					<FieldWrapper isFullWidth={isFullWidth} minWidth={170} {...getRootProps()}>
						<LabelContainer {...getLabelProps()}>
							<label htmlFor={id}>{label} {showOptionalHint && !isRequired && <Hint>(Optional)</Hint>}</label>
							{hint && <Hint htmlFor={id}>{hint}</Hint>}
						</LabelContainer>
						<MenuAnchor>
							<SelectComponent {...getInputProps({ name: input.name, placeholder })} onFocus={input.onFocus} onBlur={input.onBlur} hasError={hasError} isDisabled={isDisabled} id={id} />
							<Menu hasError={hasError} {...getMenuProps()} isOpen={isOpen && Boolean(filteredOptions.length)}>
								{filteredOptions.map(({ value, label: optionLabel }, index: number) => (
									<MenuItem {...getItemProps({ key: value, index, item: value })} highlightedIndex={highlightedIndex} selectedItem={selectedItem} key={index}>
										{optionLabel}
									</MenuItem>
								))}
							</Menu>
						</MenuAnchor>
						<InputError hasError={hasError} errorMessage={meta.error as string | undefined} hasFocus={meta.active} />
					</FieldWrapper>
				)
			}}
		</Downshift>
	)
}
