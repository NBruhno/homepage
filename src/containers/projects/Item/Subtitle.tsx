import type { ComponentPropsWithoutRef } from 'react'

export const Subtitle = (props: ComponentPropsWithoutRef<'p'>) => (
	<p
		css={(theme) => ({
			fontSize: theme.font.size.s90,
			opacity: 0.6,
			lineHeight: 1.3,
			margin: '8px 0 0',
		})}
		{...props}
	/>
)
