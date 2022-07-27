import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

export const ListItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>((props, ref) => (
	<li
		css={(theme) => ({
			borderRight: `1px solid ${theme.color.gray050}`,
			padding: '0 12px',
			display: 'inline-flex',

			'&:last-of-type': {
				borderRight: 'none',
			},
		})}
		ref={ref}
		{...props}
	/>
))
