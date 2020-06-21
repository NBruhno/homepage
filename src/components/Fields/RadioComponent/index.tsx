import { isString, isNumber } from 'lodash-es'
import { useField } from 'react-final-form'

import { formatToOptions, Option } from 'lib/formatToOptions'

import { FieldWrapper } from '../FieldWrapper'
import { InputError } from '../InputError'
import { RowLabel } from '../RowLabel'
import { Hint } from '../Hint'

import { RadioCircle } from './RadioCircle'
import { validators } from './validators'
import { Radio } from './Radio'

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

export const RadioComponent = ({
	parse = (value) => value || null, required = false, fullWidth = true, enableValidate = true,
	options, disabled, name, format, id = name,
}: Props) => {
	const { input, meta } = useField(
		name,
		{
			type: 'text',
			parse,
			format,
			allowNull: true,
			validate: (!disabled && enableValidate && validators) ? validators({ required }) : null,
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

	const hasError = meta.submitFailed && Boolean(meta.error)
	const formattedOptions = options ? formatToOptions(options) : []
	const globallyDisabled = disabled

	return (
		<FieldWrapper fullWidth={fullWidth} minWidth={170}>
			{formattedOptions.map(({ value, label, hint, disabled }: { value: any, label: string, hint: string, disabled: boolean }, index: number) => {
				const checked = value === input.value
				return (
					<RowLabel htmlFor={`${index}-${id}`} css={{ paddingBottom: '12px', marginBottom: 0 }} key={index}>
						<Radio
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
							focus={meta.active && (checked || (input.value === '' && index === 0))}
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

export default RadioComponent
