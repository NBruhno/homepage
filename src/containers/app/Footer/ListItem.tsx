import type { ComponentProps } from 'react'

export const ListItem = (props: ComponentProps<'li'>) => (
	<li
		css={(theme) => ({
			marginRight: '12px',
			borderRight: `1px solid ${theme.color.gray050}`,
			paddingRight: '12px',
			display: 'inline-flex',

			'&:last-child': {
				borderRight: 'none',
			},
		})}
		{...props}
	/>
)
