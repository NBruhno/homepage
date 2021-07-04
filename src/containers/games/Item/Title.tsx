import type { ComponentProps } from 'react'

/* eslint-disable jsx-a11y/heading-has-content */
export const Title = (props: ComponentProps<'h3'>) => (
	<h3
		css={(theme) => ({
			fontSize: theme.fontSize.s115,
			marginTop: 0,
			marginBottom: '6px',
		})}
		{...props}
	/>
)
