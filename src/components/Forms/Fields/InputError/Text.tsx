import type { ComponentProps } from 'react'

export const Text = (props: ComponentProps<'span'>) => (
	<span
		css={(theme) => ({
			color: theme.color.white,
			fontSize: theme.font.size.s80,
			marginLeft: '5px',
			verticalAlign: '5px',
		})}
		{...props}
	/>
)
