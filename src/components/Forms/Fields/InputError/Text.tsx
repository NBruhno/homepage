import type { ComponentProps } from 'react'

export const Text = (props: ComponentProps<'span'>) => (
	<span
		css={(theme: Theme) => ({
			color: theme.color.white,
			fontSize: theme.fontSize.s80,
			marginLeft: '5px',
			verticalAlign: '5px',
		})}
		{...props}
	/>
)
