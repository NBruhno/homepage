/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentPropsWithoutRef } from 'react'

export const Summary = (props: ComponentPropsWithoutRef<'h2'>) => (
	<h2
		css={(theme) => ({
			fontSize: theme.font.size.s115,
			margin: '8px 0 0',
			lineHeight: 1.4,
		})}
		{...props}
	/>
)
