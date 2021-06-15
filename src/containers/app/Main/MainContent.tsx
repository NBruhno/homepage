import type { ComponentProps } from 'react'

export const MainContent = (props: ComponentProps<'main'>) => (
	<main
		css={(theme: Theme) => ({
			color: theme.color.text,
			position: 'relative',
			display: 'grid',
			gridTemplateRows: '1fr auto',
		})}
		{...props}
	/>
)
