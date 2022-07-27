import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'div'> & {
	isHighlighted: boolean,
	isSelected: boolean,
}

export const Item = forwardRef<HTMLDivElement, Props>(({ isHighlighted, isSelected, ...rest }, ref) => (
	<div
		css={(theme) => ({
			backgroundColor: (() => {
				if (isSelected) return theme.color.primary
				if (isHighlighted) return adjustHsl(theme.color.primary, { alpha: 0.5 })
				return theme.color.inputBackground
			})(),
			color: theme.color.text,
			fontWeight: theme.font.weight.regular,
			padding: '12px',
			transition: `background-color 135ms ${theme.animation.default}`,
			cursor: 'pointer',

			'&:hover': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.5 }),
			},
		})}
		{...rest}
		ref={ref}
	/>
))
