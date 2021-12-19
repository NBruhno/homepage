import type { Value } from '../Value'
import type { ChangeEvent } from 'react'

import { useField } from 'react-final-form'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { RowLabel } from '../RowLabel'

import { RadioCircle } from './RadioCircle'
import { RadioComponent } from './RadioComponent'
import { validators } from './validators'

export type Option = {
	label: string,
	value: Value,
	options?: Array<Omit<Option, 'options'>>,
	hint?: string,
	isDisabled?: boolean,
}

type Props = {
	name: string,
	options: Array<Option>,

	isDisabled?: boolean,
	enableValidate?: boolean,
	isFullWidth?: boolean,
	id?: string,
	isRequired?: boolean,

	format?: (value: Value, name: string) => any,
	parse?: (value: Value, name: string) => any,
}

export const Radio = ({
	parse = (value) => value ?? null, isRequired = false, isFullWidth = true, enableValidate = true,
	options, isDisabled = false, name, id = name,
}: Props) => {
	const { input, meta } = useField<Value, HTMLInputElement>(
		name,
		{
			type: 'text',
			parse,
			allowNull: true,
			validate: validators({ isRequired, isDisabled: !enableValidate || isDisabled }),
		},
	)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const option = options[parseInt(event.currentTarget.value, 10)]
		input.onChange(option.value)
	}

	const hasError = Boolean(meta.submitFailed) && Boolean(meta.error)
	const isGloballyDisabled = isDisabled

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170}>
			{options.map(({ value, label, hint, isDisabled = false }, index: number) => {
				const isChecked = value === input.value
				return (
					<RowLabel htmlFor={`${index}-${id}`} css={{ paddingBottom: '12px', marginBottom: 0 }} key={index}>
						<RadioComponent
							{...input}
							id={`${index}-${id}`}
							type='radio'
							disabled={isGloballyDisabled || isDisabled}
							value={index}
							onChange={handleChange}
							checked={isChecked}
							required={isRequired}
						/>
						<RadioCircle
							isChecked={isChecked}
							isDisabled={isGloballyDisabled || isDisabled}
							hasFocus={Boolean(meta.active) && (isChecked || (input.value === '' && index === 0))}
							hasError={hasError}
						/>
						<div>
							<label htmlFor={`${index}-${id}`} css={{ marginTop: '2px' }}>{label}</label>
							{hint && <Hint>{hint}</Hint>}
						</div>
					</RowLabel>
				)
			})}
			<InputError hasError={hasError} errorMessage={meta.error as string | undefined} />
		</FieldWrapper>
	)
}
