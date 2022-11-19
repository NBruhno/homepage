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

export const InputContainer = forwardRef<HTMLDivElement, Props>(({ hasError, isDisabled, isFocusVisible, isHovered, isFocus, ...rest }, ref) => (
	<div
		css={(theme) => ([
			DefaultInputStyle({ theme, hasError, isDisabled, isFocusVisible, isHovered }),
			{
				cursor: 'text',
				display: 'flex',
				columnGap: '8px',
				justifyContent: 'space-between',
			},
			isFocus ? {
				borderColor: hasError ? theme.color.error : theme.color.primary,
			} : undefined,
		])}
		ref={ref}
		{...rest}
	/>
))
