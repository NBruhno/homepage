import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = ComponentPropsWithoutRef<'input'> & {
	hasError: boolean,
	isDisabled: boolean,
	isHovered: boolean,
	isFocusVisible: boolean,
}

export const SelectComponent = forwardRef<HTMLInputElement, Props>(({ hasError, isDisabled = false, isHovered = false, isFocusVisible, ...rest }, ref) => (
	<input
		css={(theme) => ([
			DefaultInputStyle({ hasError, isDisabled, isHovered, isFocusVisible, theme }),
		])}
		disabled={isDisabled}
		ref={ref}
		{...rest}
	/>
))
