import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
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
	const isChecked = watch(name) as boolean
	const { isFocusVisible, focusProps } = useFocusRing({ within: true })
	const { hoverProps, isHovered } = useHover({})

	const inputProps = register(name, {
		disabled: isDisabled,
		value: false,
		setValueAs: (value: unknown) => value === undefined || value === '' ? false : value,
	})

	return (
		<FieldWrapper isFullWidth={isFullWidth}>
			<RowLabel htmlFor={id} {...focusProps} {...hoverProps}>
				<ToggleComponent label={label} isChecked={isChecked} isDisabled={isDisabled} isFocusVisible={isFocusVisible} isHovered={isHovered} />
				<LabelContainer htmlFor={id} css={{ margin: '0 0 0 6px' }}>
					<span>{label}</span>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
				<Checkbox
					{...inputProps}
					disabled={isDisabled}
					id={id}
					type='checkbox'
				/>
			</RowLabel>
		</FieldWrapper>
	)
}
