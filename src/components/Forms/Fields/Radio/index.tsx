import { isString, isNumber } from 'lodash-es'
import { useField } from 'react-final-form'

import type { Option } from 'lib/formatToOptions'
import { formatToOptions } from 'lib/formatToOptions'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { RowLabel } from '../RowLabel'

import { RadioCircle } from './RadioCircle'
import { RadioComponent } from './RadioComponent'
import { validators } from './validators'

type Props = {
	name: string,
	options: Array<Option>,

	disabled?: boolean,
	enableValidate?: boolean,
	fullWidth?: boolean,
	id?: string,
	required?: boolean,

	format?: (value: any, name: string) => any,
	parse?: (value: any, name: string) => any,
}

export const Radio = ({
	parse = (value) => value || null, required = false, fullWidth = true, enableValidate = true,
	options, disabled = false, name, format, id = name,
}: Props) => {
	const { input, meta } = useField(
		name,
		{
			type: 'text',
			parse,
			format,
			allowNull: true,
			validate: (!disabled && enableValidate && validators) ? validators({ required }) : undefined,
		},
	)

	const handleChange = (event: any) => {
		const option = options[event.currentTarget.value]
		const value = (isString(option) || isNumber(option)) ? option : option.value
		input.onChange(value)
	}

	const handleBlur = (event: any) => {
		const option = options[event.currentTarget.value]
		const value = (isString(option) || isNumber(option)) ? option : option.value
		input.onBlur(value)
	}

	const hasError = Boolean(meta.submitFailed) && Boolean(meta.error)
	const formattedOptions = options ? formatToOptions(options) : []
	const globallyDisabled = disabled

	return (
		<FieldWrapper fullWidth={fullWidth} minWidth={170}>
			{formattedOptions.map(({ value, label, hint, disabled = false }, index: number) => {
				const checked = value === input.value
				return (
					<RowLabel htmlFor={`${index}-${id}`} css={{ paddingBottom: '12px', marginBottom: 0 }} key={index}>
						<RadioComponent
							{...input}
							id={`${index}-${id}`}
							type='radio'
							disabled={globallyDisabled || disabled}
							value={index}
							onChange={handleChange}
							onBlur={handleBlur}
							checked={checked}
							required={required}
						/>
						<RadioCircle
							checked={checked}
							disabled={globallyDisabled || disabled}
							focus={Boolean(meta.active) && (checked || (input.value === '' && index === 0))}
							hasError={hasError}
						/>
						<div>
							<label htmlFor={`${index}-${id}`} css={{ marginTop: '2px' }}>{label}</label>
							{hint && <Hint>{hint}</Hint>}
						</div>
					</RowLabel>
				)
			})}
			<InputError hasError={hasError} errorMessage={meta.error} />
		</FieldWrapper>
	)
}
