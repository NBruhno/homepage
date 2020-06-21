import { useEffect } from 'react'
import { useField } from 'react-final-form'

import { LabelContainer } from '../LabelContainer'
import { FieldWrapper } from '../FieldWrapper'
import { RowLabel } from '../RowLabel'
import { Hint } from '../Hint'

import { Checkbox } from './Checkbox'
import { CheckMark } from './CheckMark'

type Props = {
	label: string,
	name: string,

	disabled?: boolean,
	fullWidth?: boolean,
	hint?: string,
	id?: string,

	format?: (value: any, name: string) => any,
	parse?: (value: any, name: string) => any,
}

export const CheckboxComponent = ({
	parse = (value) => value || false, fullWidth = true,
	label, hint, disabled, name, format, id = name,
}: Props) => {
	const { input, meta } = useField(
		name,
		{
			type: 'text',
			parse,
			format,
		},
	)

	useEffect(() => {
		if (input.value === undefined || input.value === '') {
			input.onChange(false)
		}
	})

	return (
		<FieldWrapper fullWidth={fullWidth}>
			<RowLabel htmlFor={id}>
				<Checkbox
					{...input}
					checked={input.value || false}
					id={id}
					type='checkbox'
					disabled={disabled}
				/>
				<CheckMark checked={input.value} disabled={disabled} focus={meta.active} />
				<LabelContainer css={{ marginTop: '4px' }}>
					<div>{label}</div>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
			</RowLabel>
		</FieldWrapper>
	)
}
