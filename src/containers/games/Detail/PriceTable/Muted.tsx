import type { ComponentProps } from 'react'

export const Muted = (props: ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			color: theme.color.text,
			fontSize: theme.fontSize.s90,
			padding: '10px 0',
			opacity: 0.7,

			[theme.mediaQueries.maxTablet]: {
				textAlign: 'center',
				padding: '0 10px',
			},
		})}
		{...props}
	/>
)
