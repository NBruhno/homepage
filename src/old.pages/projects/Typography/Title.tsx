/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentPropsWithoutRef } from 'react'

export const Title = (props: ComponentPropsWithoutRef<'h1'>) => (
	<h1
		css={(theme) => ({
			fontSize: theme.font.size.s200,
			margin: 0,
		})}
		{...props}
	/>
)
