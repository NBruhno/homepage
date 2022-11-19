import type { ComponentPropsWithRef } from 'react'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithRef<'input'> & {
	isDisabled: boolean,
	hasError: boolean,
	shouldFill?: boolean,
}

export const InputComponent = forwardRef<HTMLInputElement, Props>(({ isDisabled, hasError, shouldFill = true, ...rest }, ref) => (
	<input
		css={(theme) => ({
			backgroundColor: 'transparent',
			border: 'none',
			color: theme.color.text,
			fontFamily: theme.font.family.roboto,
			fontSize: theme.font.size.s100,
			WebkitTapHighlightColor: 'transparent',
			display: 'block',
			width: shouldFill ? '100%' : 'max-content',

			'&:focus': {
				outline: 'none',
			},

			'::placeholder': {
				color: hasError ? adjustHsl(theme.color.grayLight, { alpha: 0.65 }) : theme.color.gray,
			},
		})}
		disabled={isDisabled}
		ref={ref}
		{...rest}
	/>
))
