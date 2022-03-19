import type { ComponentPropsWithoutRef } from 'react'

export const MainContent = (props: ComponentPropsWithoutRef<'main'>) => (
	<main
		css={(theme) => ({
			color: theme.color.text,
			position: 'relative',
			display: 'grid',
			gridTemplateRows: '1fr auto',
		})}
		{...props}
	/>
)
