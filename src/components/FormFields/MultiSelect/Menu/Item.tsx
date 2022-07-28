import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'div'> & {
	isHighlighted: boolean,
}

export const Item = forwardRef<HTMLDivElement, Props>(({ isHighlighted, ...rest }, ref) => (
	<div
		css={(theme) => ({
			backgroundColor: isHighlighted ? adjustHsl(theme.color.primary, { alpha: 0.4 }) : theme.color.inputBackground,
			color: theme.color.text,
			fontWeight: theme.font.weight.regular,
			padding: '12px',
			transition: `background-color 135ms ${theme.animation.default}`,
			cursor: 'pointer',

			'&:hover': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.4 }),
			},
		})}
		{...rest}
		ref={ref}
	/>
))
