/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentProps } from 'react'

export const Title = (props: ComponentProps<'h3'>) => (
	<h3
		css={(theme) => ({
			fontSize: theme.font.size.s115,
			marginTop: 0,
			marginBottom: '6px',
		})}
		{...props}
	/>
)
