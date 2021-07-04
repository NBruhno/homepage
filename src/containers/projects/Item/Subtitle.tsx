import type { ComponentProps } from 'react'

export const Subtitle = (props: ComponentProps<'p'>) => (
	<p
		css={(theme) => ({
			fontSize: theme.fontSize.s90,
			opacity: 0.6,
			lineHeight: 1.3,
			margin: '8px 0 0',
		})}
		{...props}
	/>
)
