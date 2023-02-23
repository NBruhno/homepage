import type { ComponentPropsWithoutRef } from 'react'

export const Item = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			padding: '6px 10px',
			borderRight: `1px solid ${theme.color.border}`,
			maxHeight: '86px',
			overflow: 'none',

			'&:last-child': {
				borderRight: 'none',
			},
		})}
		{...props}
	/>
)
