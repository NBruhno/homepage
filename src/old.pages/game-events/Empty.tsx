import type { ComponentPropsWithoutRef } from 'react'

export const Empty = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			padding: '16px 0 8px',
			textAlign: 'center',
			color: theme.color.textSubtitle,
		})}
		{...props}
	/>
)
