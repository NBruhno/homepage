import type { ComponentProps } from 'react'

export const Title = (props: ComponentProps<'h4'>) => (
	<h4
		css={(theme) => ({
			margin: '0 0 4px',
			fontSize: theme.font.size.s80,
			color: theme.color.textFaded,
		})}
		{...props}
	>
		{props.children}
	</h4>
)
