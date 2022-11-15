import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'div'> & {
	isHighlighted: boolean,
	isSelected: boolean,
	isDisabled: boolean,
}

export const Item = forwardRef<HTMLDivElement, Props>(({ isHighlighted, isSelected, isDisabled, ...rest }, ref) => (
	<div
		css={(theme) => ({
			backgroundColor: (() => {
				if (isHighlighted) return isDisabled ? theme.color.gray : adjustHsl(theme.color.primary, { alpha: 0.4 })
				if (isSelected) return isDisabled ? adjustHsl(theme.color.primaryLight, { alpha: 0.2 }) : adjustHsl(theme.color.primary, { alpha: 0.2 })
				return isDisabled ? theme.color.grayDark : theme.color.inputBackground
			})(),
			color: theme.color.text,
			fontWeight: theme.font.weight.regular,
			margin: '4px 6px',
			padding: '8px 10px',
			borderRadius: '4px',
			transition: `background-color 135ms ${theme.animation.default}`,
			cursor: isDisabled ? 'auto' : 'pointer',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			columnGap: '8px',

			'&:hover': {
				backgroundColor: isDisabled ? theme.color.grayDark : adjustHsl(theme.color.primary, { alpha: 0.4 }),
			},
		})}
		{...rest}
		ref={ref}
	/>
))
