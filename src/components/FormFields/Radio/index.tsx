import { get, isEmpty, isString } from 'lodash'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { InputError } from '../InputError'
import { RowLabel } from '../RowLabel'

import { RadioCircle } from './RadioCircle'
import { RadioComponent } from './RadioComponent'

export type Option = {
	label: string,
	value: number | string,
	options?: Array<Omit<Option, 'options'>>,
	hint?: string,
	isDisabled?: boolean,
}

type Props = {
	name: string,
	options: Array<Option>,

	isDisabled?: boolean,
	isFullWidth?: boolean,
	isRequired?: boolean,
}

export const Radio = ({ isRequired = false, isFullWidth = true, options, isDisabled = false, name }: Props) => {
	const id = useUnique(name)
	const { register, formState: { errors }, watch } = useFormContext()
	const fieldValue = watch(name) as string
	const [isFocus, setIsFocus] = useState(false)

	const error = get(errors, name)
	const isGloballyDisabled = isDisabled
	const hasError = Boolean(error)

	return (
		<FieldWrapper isFullWidth={isFullWidth} minWidth={170}>
			{options.map(({ value, label, hint, isDisabled = false }, index: number) => {
				const inputProps = register(name, {
					required: isRequired ? 'This field is required' : false,
					disabled: isGloballyDisabled || isDisabled,
					onBlur: () => isFocus && setIsFocus(false),
					setValueAs: (value: unknown) => (isString(value) && isEmpty(value)) ? undefined : value,
				})
				const isChecked = value === fieldValue
				return (
					<RowLabel htmlFor={`${index}-${id}`} css={{ paddingBottom: '12px', marginBottom: 0 }} key={index}>
						<RadioComponent
							{...inputProps}
							id={`${index}-${id}`}
							type='radio'
							value={value}
						/>
						<RadioCircle
							isChecked={isChecked}
							isDisabled={Boolean(inputProps.disabled)}
							hasFocus={isFocus && (isChecked || (fieldValue === '' && index === 0))}
							hasError={hasError}
						/>
						<div>
							<label htmlFor={`${index}-${id}`} css={{ marginTop: '2px' }}>{label}</label>
							{hint && <Hint>{hint}</Hint>}
						</div>
					</RowLabel>
				)
			})}
			<InputError hasError={hasError} errorMessage={error?.message as string | undefined} />
		</FieldWrapper>
	)
}
