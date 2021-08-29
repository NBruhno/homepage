import { useEffect } from 'react'
import { useField } from 'react-final-form'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { LabelContainer } from '../LabelContainer'
import { RowLabel } from '../RowLabel'

import { Checkbox } from './Checkbox'
import { ToggleComponent } from './ToggleComponent'

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

export const Toggle = ({
	parse = (value: any) => value || false, fullWidth = true,
	label, hint, disabled = false, name, id = name,
}: Props) => {
	const { input, meta } = useField(
		name,
		{
			type: 'text',
			parse,
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
				<ToggleComponent checked={input.value} disabled={disabled} focus={meta.active} />
				<LabelContainer css={{ margin: '0 0 0 6px' }}>
					<div>{label}</div>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
				<Checkbox
					{...input}
					id={id}
					type='checkbox'
					disabled={disabled}
					checked={input.value}
				/>
			</RowLabel>
		</FieldWrapper>
	)
}
