import type { ComponentProps } from 'react'

export const Subtitle = (props: ComponentProps<'span'>) => (
	<span
		css={(theme) => ({
			fontSize: theme.font.size.s90,
			opacity: 0.6,
		})}
		{...props}
	/>
)
