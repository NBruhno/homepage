import type { ComponentPropsWithoutRef } from 'react'

export const Subtitle = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={(theme) => ({
			fontSize: theme.font.size.s90,
			opacity: 0.6,
		})}
		{...props}
	/>
)
