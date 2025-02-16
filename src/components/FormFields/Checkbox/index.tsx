import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { useFormContext, useWatch } from 'react-hook-form'

import { useUnique } from 'lib/hooks'

import { FieldWrapper } from '../FieldWrapper'
import { Hint } from '../Hint'
import { LabelContainer } from '../LabelContainer'
import { RowLabel } from '../RowLabel'

import { CheckMark } from './CheckMark'
import { CheckboxComponent } from './CheckboxComponent'

type Props = {
	label: string
	name: string

	hint?: string
	isDisabled?: boolean
	isFullWidth?: boolean
}

export const Checkbox = ({ isFullWidth = true, label, hint, isDisabled = false, name }: Props) => {
	const id = useUnique(name)
	const { register } = useFormContext()
	const isChecked = useWatch({ name }) as boolean
	const { isFocusVisible, focusProps } = useFocusRing({ within: true })
	const { hoverProps, isHovered } = useHover({})

	const inputProps = register(name, {
		disabled: isDisabled,
		value: false,
		setValueAs: (value: unknown) => (value === undefined || value === '' ? false : value),
	})

	return (
		<FieldWrapper isFullWidth={isFullWidth}>
			<RowLabel htmlFor={id} {...focusProps} {...hoverProps}>
				<CheckMark
					isChecked={isChecked}
					isDisabled={isDisabled}
					isFocusVisible={isFocusVisible}
					isHovered={isHovered}
				/>
				<LabelContainer htmlFor={id} style={{ margin: '0 0 0 6px' }}>
					<span>{label}</span>
					{hint && <Hint>{hint}</Hint>}
				</LabelContainer>
				<CheckboxComponent {...inputProps} id={id} type='checkbox' />
			</RowLabel>
		</FieldWrapper>
	)
}
