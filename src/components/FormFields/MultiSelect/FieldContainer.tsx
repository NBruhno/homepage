import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

import { DefaultInputStyle } from '../DefaultInputStyle'

type Props = ComponentPropsWithoutRef<'div'> & {
	hasError: boolean,
	isDisabled: boolean,
	isHovered: boolean,
	isFocusVisible: boolean,
	isFocus: boolean,
}

export const FieldContainer = forwardRef<HTMLDivElement, Props>(({ hasError, isDisabled, isFocusVisible, isHovered, isFocus, ...rest }, ref) => (
	<div
		css={(theme) => ([
			DefaultInputStyle({ theme, hasError, isDisabled, isFocusVisible, isHovered }),
			{
				cursor: 'text',
			},
			isFocus ? {
				borderColor: hasError ? theme.color.error : theme.color.primary,
			} : undefined,
		])}
		ref={ref}
		{...rest}
	/>
))
