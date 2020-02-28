import { isString, isNumber } from 'lodash-es'
import { useField } from 'react-final-form'

import formatToOptions from 'lib/formatToOptions'
import useUnique from 'lib/useUnique'

import FieldWrapper from '../FieldWrapper'
import InputError from '../InputError'
import Hint from '../Hint'

import RadioCircle from './RadioCircle'
import validators from './validators'
import RowLabel from './RowLabel'
import Label from './Label'
import Radio from './Radio'

type Props = {
	name: string,
	options: { label: string, value: any, hint?: string, disabled?: boolean }[],
	required?: boolean,
	disabled?: boolean,
	fullWidth?: boolean,
	enableValidate?: boolean,
	parse?: (value: any, name: string) => any,
	format?: (value: any, name: string) => any,
}

export const RadioComponent = ({
	parse = (value) => value || null, required = false, fullWidth = true, enableValidate = true,
	options, disabled, name, format,
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

	const handleChange = (event) => {
		const option = options[event.currentTarget.value]
		const value = (isString(option) || isNumber(option)) ? option : option.value
		input.onChange(value)
	}

	const handleBlur = (event) => {
		const option = options[event.currentTarget.value]
		const value = (isString(option) || isNumber(option)) ? option : option.value
		input.onBlur(value)
	}

	const hasError = meta.submitFailed && Boolean(meta.error)
	const formattedOptions = options ? formatToOptions(options) : []
	const id = useUnique(name)
	const globallyDisabled = disabled

	return (
		<FieldWrapper fullWidth={fullWidth} minWidth={170}>
			{formattedOptions.map(({ value, label, hint, disabled }, idx) => {
				const checked = value === input.value
				return (
					<RowLabel htmlFor={`${idx}-${id}`} disabled={globallyDisabled || disabled} key={idx}>
						<Radio
							{...input}
							id={`${idx}-${id}`}
							type='radio'
							disabled={globallyDisabled || disabled}
							value={idx}
							onChange={handleChange}
							onBlur={handleBlur}
							checked={checked}
							required={required}
						/>
						<RadioCircle
							checked={checked}
							disabled={globallyDisabled || disabled}
							focus={meta.active && (checked || (input.value === '' && idx === 0))}
							hasError={hasError}
						/>
						<div>
							<Label>{label}</Label>
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
