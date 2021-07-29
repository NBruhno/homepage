/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentProps } from 'react'

export const Subtitle = (props: ComponentProps<'h2'>) => (
	<h2
		css={(theme) => ({
			fontSize: theme.font.size.s90,
			textAlign: 'center',
			margin: '12px 0 16px',
			opacity: 0.8,
		})}
		{...props}
	/>
)
