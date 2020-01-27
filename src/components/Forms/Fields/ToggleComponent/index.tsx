import { useEffect } from 'react'
import { useField } from 'react-final-form'

import useUnique from 'lib/useUnique'

import Hint from '../Hint'
import RowLabel from '../RowLabel'
import FieldWrapper from '../FieldWrapper'

import Checkbox from './Checkbox'
import Toggle from './Toggle'

type Props = {
	name: string,
	label: string,
	hint?: string,
	disabled?: boolean,
	fullWidth?: boolean,
	parse?: (value: any, name: string) => any,
	format?: (value: any, name: string) => any,
}

export const ToggleComponent = ({
	parse = (value: any) => value || false, fullWidth = true,
	label, hint, disabled, name, format,
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
	}, [])

	const id = useUnique(name)

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
				<div>
					<div>{label}</div>
					{hint && <Hint>{hint}</Hint>}
				</div>
			</RowLabel>
		</FieldWrapper>
	)
}

export default ToggleComponent
