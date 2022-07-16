import type { ComponentPropsWithoutRef } from 'react'

export const Caption = (props: ComponentPropsWithoutRef<'p'>) => (
	<p
		css={(theme) => ({
			opacity: 0.7,
			fontSize: theme.font.size.s90,
			textAlign: 'center',
			margin: '6px 0 42px',
		})}
		{...props}
	/>
)
