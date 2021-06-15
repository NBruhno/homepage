import type { ComponentProps } from 'react'

export const Subtitle = (props: ComponentProps<'span'>) => (
	<span
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s90,
			opacity: 0.6,
		})}
		{...props}
	/>
)
