import type { ComponentProps } from 'react'

export const Subtitle = (props: ComponentProps<'p'>) => (
	<p
		css={(theme) => ({
			color: theme.color.text,
			opacity: 0.6,
			marginTop: '36px',
			textAlign: 'center',
		})}
		{...props}
	/>
)
