/* eslint-disable jsx-a11y/heading-has-content */
import type { ComponentPropsWithoutRef } from 'react'

export const Subtitle = (props: ComponentPropsWithoutRef<'h3'>) => (
	<h3
		css={(theme) => ({
			fontFamily: theme.font.family.roboto,
			fontSize: theme.font.size.s90,
			margin: '6px 0 42px',
			opacity: 0.7,
		})}
		{...props}
	/>
)
