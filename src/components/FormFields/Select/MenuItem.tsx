import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	highlightedIndex: number,
	selectedItem: any,
	index: number,
	value: any,
}

export const MenuItem = forwardRef<HTMLDivElement, Props>(({ highlightedIndex, selectedItem, index, value, ...rest }, ref) => (
	<div
		css={(theme) => ({
			backgroundColor: highlightedIndex === index ? theme.color.primary : theme.color.inputBackground,
			color: theme.color.text,
			fontWeight: selectedItem === value ? theme.font.weight.bold : theme.font.weight.regular,
			padding: '12px',
			transition: 'all 0.3s ease',
			cursor: 'pointer',

			'&:hover': {
				backgroundColor: theme.color.inputBackgroundHover,
			},

			'&:last-of-type': {
				borderBottomLeftRadius: '4px',
				borderBottomRightRadius: '4px',
			},

			'&:first-of-type': {
				borderTopLeftRadius: '4px',
				borderTopRightRadius: '4px',
			},
		})}
		{...rest}
		ref={ref}
	/>
))