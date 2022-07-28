import type { ComponentPropsWithRef } from 'react'

import { forwardRef } from 'react'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = ComponentPropsWithRef<'input'> & {
	hasError: boolean,
	isHovered: boolean,
	isFocusVisible: boolean,
}

export const InputComponent = forwardRef<HTMLInputElement, Props>(({ hasError, disabled: isDisabled = false, isFocusVisible, isHovered, ...rest }, ref) => (
	<input
		css={(theme) => ({
			...DefaultInputStyle({ hasError, isDisabled, isHovered, isFocusVisible, theme }),
		})}
		disabled={isDisabled}
		ref={ref}
		{...rest}
	/>
))
