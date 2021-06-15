/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentProps } from 'react'

export const Summary = (props: ComponentProps<'h2'>) => (
	<h2
		css={(theme: Theme) => ({
			fontSize: theme.fontSize.s115,
			margin: '8px 0 0',
			lineHeight: 1.4,
		})}
		{...props}
	/>
)
