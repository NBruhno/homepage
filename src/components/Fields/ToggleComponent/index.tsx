import { useEffect } from 'react'
import { useField } from 'react-final-form'

import { Hint } from '../Hint'
import { RowLabel } from '../RowLabel'
import { FieldWrapper } from '../FieldWrapper'
import { LabelContainer } from '../LabelContainer'

import { Checkbox } from './Checkbox'
import { Toggle } from './Toggle'

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

export const ToggleComponent = ({
	parse = (value: any) => value || false, fullWidth = true,
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
					id={id}
					type='checkbox'
					disabled={disabled}
					checked={input.value}
				/>
				<Toggle checked={input.value} disabled={disabled} focus={meta.active} />
				<LabelContainer>
					<div>{label}</div>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
			</RowLabel>
		</FieldWrapper>
	)
}

export default ToggleComponent
