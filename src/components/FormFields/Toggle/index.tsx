import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { LabelContainer } from '../LabelContainer'
import { RowLabel } from '../RowLabel'

import { Checkbox } from './Checkbox'
import { ToggleComponent } from './ToggleComponent'

type Props = {
	label: string,
	name: string,

	hint?: string,
	isDisabled?: boolean,
	isFullWidth?: boolean,
}

export const Toggle = ({ isFullWidth = true, label, hint, isDisabled = false, name }: Props) => {
	const id = useUnique(name)
	const { register, watch } = useFormContext()
	const isChecked = watch(name, null) as boolean
	const [isFocus, setIsFocus] = useState(false)

	const inputProps = register(name, {
		disabled: isDisabled,
		onBlur: () => isFocus && setIsFocus(false),
		value: false,
		setValueAs: (value: unknown) => value === undefined || value === '' ? false : value,
	})

	return (
		<FieldWrapper isFullWidth={isFullWidth}>
			<RowLabel htmlFor={id}>
				<ToggleComponent isChecked={isChecked} isDisabled={isDisabled} hasFocus={isFocus} />
				<LabelContainer htmlFor={id} css={{ margin: '0 0 0 6px' }}>
					<span>{label}</span>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
				<Checkbox
					{...inputProps}
					checked={isChecked}
					disabled={isDisabled}
					id={id}
					onFocus={() => !isFocus && setIsFocus(true)}
					type='checkbox'
				/>
			</RowLabel>
		</FieldWrapper>
	)
}
