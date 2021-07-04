/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentProps } from 'react'

export const Title = (props: ComponentProps<'h1'>) => (
	<h1
		css={(theme) => ({
			fontSize: theme.fontSize.s200,
			margin: 0,
		})}
		{...props}
	/>
)
