import type { ComponentPropsWithoutRef } from 'react'

export const Subtitle = (props: ComponentPropsWithoutRef<'p'>) => (
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
