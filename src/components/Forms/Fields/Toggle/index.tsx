import type { Value } from '../Value'

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

	isDisabled?: boolean,
	isFullWidth?: boolean,
	hint?: string,
	id?: string,

	format?: (value: Value, name: string) => any,
	parse?: (value: Value, name: string) => any,
}

export const Toggle = ({
	parse = (value: Value) => value ?? false, isFullWidth = true,
	label, hint, isDisabled = false, name, id = name,
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
		<FieldWrapper isFullWidth={isFullWidth}>
			<RowLabel htmlFor={id}>
				<ToggleComponent isChecked={Boolean(input.value)} isDisabled={isDisabled} hasFocus={meta.active} />
				<LabelContainer css={{ margin: '0 0 0 6px' }}>
					<div>{label}</div>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
				<Checkbox
					{...input}
					id={id}
					type='checkbox'
					disabled={isDisabled}
					checked={Boolean(input.value)}
				/>
			</RowLabel>
		</FieldWrapper>
	)
}
