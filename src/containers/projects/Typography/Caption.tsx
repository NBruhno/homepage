import type { ComponentProps } from 'react'

export const Caption = (props: ComponentProps<'p'>) => (
	<p
		css={(theme) => ({
			opacity: 0.7,
			fontSize: theme.fontSize.s90,
			textAlign: 'center',
			margin: '6px 0 42px',
		})}
		{...props}
	/>
)
