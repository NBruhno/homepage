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
				if (isHighlighted) return adjustHsl(theme.color.primary, { alpha: 0.4 })
				if (isSelected) return adjustHsl(theme.color.primary, { alpha: 0.2 })
				return theme.color.input.background
			})(),
			color: theme.color.text,
			margin: '4px 6px',
			padding: '8px 10px',
			borderRadius: '4px',
			transition: `background-color 135ms ${theme.animation.default}`,
			cursor: 'pointer',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			columnGap: '8px',

			'&:hover': {
				backgroundColor: adjustHsl(theme.color.primary, { alpha: 0.4 }),
			},
		})}
		{...rest}
		ref={ref}
	/>
))
